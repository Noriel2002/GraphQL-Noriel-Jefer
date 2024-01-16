import { gql } from "graphql-tag";

export const typeDefs = gql`
  type Query {
    hello: String
    personas: [Persona]
    persona(dni: String!): Persona
    actividades: [Actividad]
    actividadesPorDNI(dni: String!): [Actividad]
  }

  type Mutation {
    createPersona(nombre: String!, dni: String!, edad: String!): Persona
    updatePersona(dni: String!, nombre: String, edad: String): Persona
    deletePersona(dni: String!): Persona
    crearActividad(DNI: String!, nombre: String!, hora: String!): Actividad
  }

  type Persona {
    dni: String!
    nombre: String!
    edad: String!
  }

  type Actividad {
    DNI: String
    nombre: String
    hora: String
  }

`;
