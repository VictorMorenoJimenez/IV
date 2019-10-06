global.countries = [
    {
      id: 1,
      name: "Spain",
      holidays: ["Navidad","Pascua"],
      states: ["Andalucia","Pais Vasco"]
    },
    {
      id: 2,
      name: "France",
      holidays: ["Navidad","Baguette day"],
      states: ["Paris","Lile"]
    },  
  ]

global.states = [
    {
      id: 200,
      name: "Andalucia",
      holidays: ["Dia Andalucia","Corpus"],
      country: "Spain",
      cities: ["Granada","Sevilla"]
    },
    {
      id: 201,
      name: "Baleares",
      holidays: ["Dia de Baleares","Dia de las Pitiusas"],
      country: "Spain",
      cities: ["Ibiza","Maon"]
    },  
  ]

global.cities = [
    {
      id: 200000,
      name: "Madrid",
      holidays: ["Dia de Madrid","Dia del Oso"],
      state: "Madrid",
      country: "Spain"
    },
    {
      id: 200001,
      name: "Paris",
      holidays: ["Dia de Paris","Dia Torre Eiffel"],
      state: "Paris",
      country: "France"
    },
    {
      id: 200002,
      name: "Ibiza",
      holidays: ["Dia de Ibiza","Santa Maria"],
      state: "Baleares",
      country: "Spain"
    },  
  ]

  module.exports.cities = cities;
  module.exports.countries = countries;
  module.exports.states = states;