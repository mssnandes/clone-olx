import { Router } from 'express';
import { authPrivate } from '../middlewares/Auth.js';
import { getCategories, create } from '../controllers/AdController.js';

const router = Router();

router.post('/ads/add',authPrivate, create);
//router.get('/ads/list', getList);
//router.get('/ads/:id', getItem);
//router.post('/ad/:id',authPrivate, update);

router.get('/categories', getCategories);

export default router;