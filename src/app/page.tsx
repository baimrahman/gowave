'use client';

import dynamic from "next/dynamic";
import Image from "next/image";

const Map = dynamic(() => import('@/components/Map'), {
  ssr: false,
})

export default function Home() {
  return (
    <Map />
  );
}
