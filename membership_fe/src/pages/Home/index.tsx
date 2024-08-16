import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IArticle, ICurrentUser, IVideo } from '../../types';
import axios from 'axios';
import './index.css'

interface HomeProps {
  articles: IArticle[];
  videos: IVideo[];
}

const Home: React.FC<HomeProps> = ({ articles, videos }) => {
  const [currentUser, setCurrentUser] = useState<ICurrentUser>({} as ICurrentUser);
  const [articlesToShow, setArticlesToShow] = useState<IArticle[]>([]);
  const [videosToShow, setVideosToShow] = useState<IVideo[]>([]);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_profile');
    navigate('/login');
  }

  console.log(currentUser, 'currentUser');


  async function fetchCurrentUser() {
    try {
      const data = await axios.get('http://localhost:3000/auth/profile', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (data) {
        localStorage.setItem('user_profile', JSON.stringify(data.data));
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const storedProfile = localStorage.getItem("user_profile");
    if (storedProfile) {
      const parsedProfile = JSON.parse(storedProfile);
      setCurrentUser(parsedProfile);

      const role = parsedProfile.role;
      let articleLimit = 3;
      let videoLimit = 3;

      if (role === "Silver") {
        articleLimit = 10;
        videoLimit = 10;
      } else if (role === "Platinum") {
        articleLimit = articles.length;
        videoLimit = videos.length;
      }

      setArticlesToShow(articles.slice(0, articleLimit));
      setVideosToShow(videos.slice(0, videoLimit));

    }
    fetchCurrentUser();
  }, []);

  return (
    <div>
      <div className="navbar">
        <p className="text-3xl font-bold text-zinc-200">Membership</p>
        <button className="text-lg font-bold text-zinc-200 p-2 border border-black rounded-lg bg-zinc-950" onClick={handleLogout}>Logout</button>
      </div>
      <div className='body'>
        <h1 className='text-5xl font-bold'>Hallo {currentUser.fullname ? currentUser.fullname : currentUser.name}</h1>
        <p className='text-xl font-bold mb-10'>role anda adalah : {currentUser.role}</p>
        <div className='mb-12'>
          <p className="text-2xl font-bold mb-5 text-center">List Article</p>
          <div className='p-2 flex gap-8 flex-wrap justify-center'>
            {articlesToShow.map((article) => (
              <Link to={`/detail/${article.id}`} key={article.id} className='card'>
                <img
                  src={article.image}
                  alt="Avatar"
                  className='w-full items-center h-48 rounded-t-2xl'
                />
                <div className='p-2'>
                  <p className="text-xl font-bold">{article.title}</p>
                  <p className="text-md overflow-hidden text-ellipsis line-clamp-5">{article.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="text-2xl font-bold mb-5 text-center">List Video</p>
          <div className='p-2 flex gap-8 flex-wrap justify-center'>
            {videosToShow.map((video) => (
              <Link to={`/detail/${video.id}`} key={video.id} className='card'>
                <img
                  src={video.image}
                  alt="Avatar"
                  className='w-full items-center h-48 rounded-t-2xl'
                />
                <div className='p-2'>
                  <p className="text-xl font-bold">{video.title}</p>
                  <p className="text-lg font-medium">{video.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home