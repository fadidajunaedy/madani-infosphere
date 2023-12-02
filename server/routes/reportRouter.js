const reportController = require('../controllers/reportController.js')
const router = require('express').Router()

router.get("/categories/:position", (request, response) => {
    const {position} = request.params
    const {role} = request.query
    if (role === "super-admin" || role === "admin" || position === "Executive Director" || position === "Deputy Director") {
      return response.status(200).json(categories)
    } else if (position === "HRGA") {
      return response.status(200).json(hrgaCategories)
    } else if (position === "Finance") {
      return response.status(200).json(financeCategories)
    } else if (position === "Comms") {
      return response.status(200).json(commsCategories)
    } else if (position === "Program Manager" || position === "Biofuel" || position === "Klima" || position === "Green Development" || position === "Komodo") {
      return response.status(200).json(programCategories)
    } else if (position === "Knowledge Management") {
      return response.status(200).json(knowledgeManagementCategories)
    } else {
      return response.status(200).json([])
    }
})

router.get("/categories/:position/:category", (request, response) => {
    const { position, category } = request.params
    const {role} = request.query
    if (role === "super-admin" || role === "admin" || position === "Executive Director" || position === "Deputy Director") {
      const selectedCategory = categories.find((c) => c.value === category)
      const subCategories = selectedCategory.subcategory || []
      return response.status(200).json(subCategories)
    } else if (position === "HRGA") {
      const selectedCategory = hrgaCategories.find((c) => c.value === category)
      const subCategories = selectedCategory.subcategory || []
      return response.status(200).json(subCategories)
    } else if (position === "Finance") {
      const selectedCategory = financeCategories.find((c) => c.value === category)
      const subCategories = selectedCategory.subcategory || []
      return response.status(200).json(subCategories)
    } else if (position === "Comms") {
      const selectedCategory = commsCategories.find((c) => c.value === category)
      const subCategories = selectedCategory.subcategory || []
      return response.status(200).json(subCategories)
    } else if (position === "Program Manager" || position === "Biofuel" || position === "Klima" || position === "Green Development" || position === "Komodo") {
      const selectedCategory = programCategories.find((c) => c.value === category)
      const subCategories = selectedCategory.subcategory || []
      return response.status(200).json(subCategories)
    } else if (position === "Knowledge Management") {
      const selectedCategory = knowledgeManagementCategories.find((c) => c.value === category)
      const subCategories = selectedCategory.subcategory || []
      return response.status(200).json(subCategories)
    } else {
      return response.status(200).json([])
    }
})

router.post('/', reportController.upload , reportController.addReport)
router.get('/', reportController.getAllReport)
router.get('/:id', reportController.getOneReport)
router.patch('/:id', reportController.upload, reportController.updateReport)
router.delete('/:id', reportController.deleteReport)

module.exports = router