import React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
} from '../ui/carousel'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'

const CategoryCarousel = () => {
    const category = [
        "Frontend Developer",
        "Backend Developer",
        "Data Scientist",
        "Full Stack Developer",
        "Graphic Designer",
        "Accountant",
        "Project Manager"
    ]
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");

    }

    return (
        <div className="w-full px-4 sm:px-6">
            <Carousel className="w-full max-w-6xl mx-auto my-10 relative">
                <CarouselContent>
                    {category.map((cat, index) => (
                        <CarouselItem
                            onClick={() => searchJobHandler(cat)}
                            key={index}
                            className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 px-2 cursor-pointer"
                        >
                            <Button
                                variant="outline"
                                className="w-full rounded-full text-sm py-3 cursor-pointer"
                            >
                                {cat}
                            </Button>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext className={"hidden md:flex items-center justify-center"} />
            </Carousel>
        </div>
    )
}

export default CategoryCarousel
