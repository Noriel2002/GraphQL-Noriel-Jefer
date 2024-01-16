import personas from "../models/person.js";
import fs from "fs";


// Lee los datos del archivo
const data = fs.readFileSync('./server/data/info.txt', 'utf-8');
const lines = data.split('\n');
const archivo = './server/data/info.txt';
const leerDatos = () => {
	const data = fs.readFileSync(archivo, 'utf-8');
	return data.split('\n').filter((line) => line.trim() !== '');
};
const escribirDatos = (datos) => {
	fs.writeFileSync(archivo, datos.join('\n'), 'utf-8');
};
export const resolvers = {
	Query: {
		hello: () => "Hello, GraphQL!",
		personas: async () => await personas.find(),
		persona: async (_, { dni }) => await personas.findOne({ dni }).exec(),
		actividades: () => {
			const actividades = lines
				.filter((line) => line.trim() !== '')
				.map((line) => {
					const [DNI, nombre, hora] = line.split(',');
					return { DNI, nombre, hora };
				});

			return actividades;
		},
		actividadesPorDNI: () => {
			const actividades = lines
				.filter((line) => line.trim() !== '')
				.map((line) => {
					const [DNI, nombre, hora] = line.split(',');
					return { DNI, nombre, hora };
				});

			return actividades;
		},

	},
	Mutation: {
		crearActividad: (_, { DNI, nombre, hora }) => {
			const nuevaActividad = { DNI, nombre, hora };
			const lines = [...leerDatos(), `${DNI},${nombre},${hora}`];
			escribirDatos(lines);

			return nuevaActividad;
		},
		createPersona: (_, { nombre, dni, edad }) => {
			const persona = new personas({
				nombre: nombre,
				dni: dni,
				edad: edad
			});
			const savedPersona = persona.save();
			console.log(`Persona created at ${new Date().toISOString()}`);
			return savedPersona;
		},
		updatePersona: (_, { dni, nombre, edad }) => {
			const personaIndex = personas.findIndex(persona => persona.dni === dni);
			if (personaIndex !== -1) {
				personas[personaIndex] = { ...personas[personaIndex], nombre, edad };
				return personas[personaIndex];
			}
			return null;
		},
		deletePersona: (_, { dni }) => {
			const personaIndex = personas.findIndex(persona => persona.dni === dni);
			if (personaIndex !== -1) {
				const deletedPersona = personas.splice(personaIndex, 1);
				return deletedPersona[0];
			}
			return null;
		},
	},
};
