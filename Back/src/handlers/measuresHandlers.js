const {
  measureCreator,
  measureEditor,
  getMeasure,
  // getAllByX,
  deleteMeasure,
} = require("../controllers/measuresControllers");

const measureCreatorHandler = async (req, res) => {
  try {
    const response = await measureCreator(req, res);
    res.status(201).json(response);
  } catch (error) {
    res.status(401).json("Devolución sin cargar");
  }
};
const measureEditorHandler = async (req, res) => {
  try {
    const response = await measureEditor(req, res);
    res.status(201).json(response);
  } catch (error) {
    res.status(401).json("Algo falló en la edición");
  }
};
const getMeasureHandler = async (req, res) => {
  try {
    const response = await getMeasure(req, res);
    res.status(201).json(response);
  } catch (error) {
    res.status(401).json("No se encontró el registro");
  }
};
// const getAllByXHandler = async (req, res) => {
//   try {
//     const response = await getAllByX(req, res);
//     res.status(201).json(response);
//   } catch (error) {
//     res.status(401).json("No hay registros con los datos solicitados");
//   }
// };
const deleteMeasureHandler = async (req, res) => {
  try {
    const response = await deleteMeasure(req, res);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json("No hay registros con ese ID");
  }
};
module.exports = {
  measureCreatorHandler,
  measureEditorHandler,
  getMeasureHandler,
  // getAllByXHandler,
  deleteMeasureHandler,
};
