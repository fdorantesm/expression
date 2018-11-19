import Router from 'router'

const router = Router()

import GeoController from 'controller/catalogs/Geo'
import Properties from 'controller/catalogs/Properties'

router.get('/countries', GeoController.countries)
router.get('/regions', GeoController.regions)
router.get('/cities', GeoController.cities)
router.get('/properties/categories', Properties.categories)
router.get('/properties/amenities', Properties.amenities)

export default router
