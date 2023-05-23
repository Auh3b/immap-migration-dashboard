import { YouTubeEmbed } from 'react-social-media-embed';
export default function YoutubePost({ url }: { url: string }) {
  return <YouTubeEmbed width={400} url={url} />;
}
