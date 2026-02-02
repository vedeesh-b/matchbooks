import { useRef } from "react";
import styled from "styled-components";
import { Card } from "../ui/card";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { trendingBooks } from "@/data/trendingBooks";

const StyledCardContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
  height: 100%;

  @media (max-width: 640px) {
    gap: 0.75rem;
  }
`;

type BookCarouselCardProps = {
  imgPath: string;
  title: string;
  author: string;
};

const BookCarouselCard = ({
  imgPath,
  title,
  author,
}: BookCarouselCardProps) => {
  return (
    <div className="p-1 h-full">
      <Card className="p-3 h-full border-neutral-200 hover:shadow-md transition-shadow">
        <StyledCardContent>
          <div className="shrink-0 w-12 h-12 bg-neutral-100 rounded overflow-hidden shadow-sm">
            <img
              src={imgPath}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col min-w-0">
            <h3
              className="font-semibold text-sm truncate leading-tight mb-1"
              title={title}
            >
              {title}
            </h3>
            <p className="text-xs text-neutral-500 truncate">{author}</p>
          </div>
        </StyledCardContent>
      </Card>
    </div>
  );
};

export default function BookCarousel() {
  const plugin = useRef(
    Autoplay({
      delay: 2300,
    }),
  );

  return (
    <Carousel
      opts={{ align: "start", loop: true }}
      className="w-full"
      plugins={[plugin.current]}
    >
      <CarouselContent className="-ml-4">
        {trendingBooks.map((book, index) => (
          <CarouselItem
            key={index}
            className="pl-4 basis-[85%] sm:basis-1/2 md:basis-1/2 lg:basis-1/3 xl:basis-1/4 h-full"
          >
            <BookCarouselCard
              title={book.title}
              author={book.author}
              imgPath={book.imgPath}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
