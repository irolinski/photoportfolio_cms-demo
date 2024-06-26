import { Link } from "react-router-dom";

type cardProps = {
  imageUrl: string;
  seriesTitle: string;
  seriesUrl: string;
};

export default function ProjectCard({
  imageUrl,
  seriesTitle,
  seriesUrl,
}: cardProps) {
  return (
    <div className="project-card w-96 h-96 max-w-full mx-8 my-10 md:mx-5 flex flex-col justify-center ">
      <Link to={seriesUrl}>
        <img className="xs:max-w-96 xs:max-h-96 fade-in-2s" src={imageUrl} />
        <div className="py-6 text-left">
          <span className="project-title font-header text-xl pl-2">
            {seriesTitle}
          </span>
        </div>
      </Link>
    </div>
  );
}
