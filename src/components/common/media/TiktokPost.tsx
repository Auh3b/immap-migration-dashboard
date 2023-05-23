import React, { useEffect, useState } from 'react';
import ComponentFallback from '../ComponentFallback';
import ComponentError from '../ComponentError';
import { TikTokEmbed } from 'react-social-media-embed';

export default function TiktokPost({ url }: { url: string }) {
  return <TikTokEmbed width={400} url={url} />;
}
