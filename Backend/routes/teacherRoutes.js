import express from 'express';
import { registerTeacher, teacherLogin, teacherLogout } from '../controller/teacherRegister.js';

const teacherRouter = express.Router();

teacherRouter.post('/register', registerTeacher);
teacherRouter.post('/login', teacherLogin);
teacherRouter.get('/logout', teacherLogout);


export default teacherRouter;