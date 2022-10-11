import { useNavigate } from "react-router-dom";

const ProjectCard = ({ project }) => {
	const navigate = useNavigate();

	return (
		<div
			className="bg-zinc-800 w-96 rounded-lg shadow-lg p-4 mb-2"
			onClick={() => navigate(`/projects/${project._id}`)}
		>
			<h2 className="text-lg font-bold">{project.name}</h2>
			<p className="text-slate-400 text-sm">{project.description}</p>
		</div>
	);
};

export default ProjectCard;
