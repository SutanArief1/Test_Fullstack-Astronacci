import { useParams } from 'react-router-dom';
import { IArticle, IVideo } from '../../types';

interface DetailContentProps {
  articles: IArticle[];
  videos: IVideo[];
}

const DetailContent: React.FC<DetailContentProps> = ({ articles, videos }) => {
  const { id } = useParams<{ id: string }>();
  const article = articles.find((item) => item.id === parseInt(id || ''));
  const video = videos.find((item) => item.id === parseInt(id || ''));

  const content = article || video;

  if (!content) {
    return <p>Content not found</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-4xl font-bold mb-4">{content.title}</h1>
      <img src={content.image} alt={content.title} className="mb-4 rounded-lg" />
      <p className="text-lg">{content.description}</p>
    </div>
  );
}

export default DetailContent;