import Hero from "../../components/Hero";
 import FeaturedTasks from "../../components/FeaturedTasks";
 import TopFreelancers from "../../components/TopFreelancers";
 import HowItWorks from "../../components/HowItWorks";
 import PlatformStats from "../../components/PlatformStats";
 import PopularCategories from "../../components/PopularCategories";
 import Testimonials from "../../components/Testimonials";
export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedTasks />
      <TopFreelancers />
      <HowItWorks />
      <PlatformStats />
      <PopularCategories />
      <Testimonials />

    </>
  );
}