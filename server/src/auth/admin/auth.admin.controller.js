import { AdminService } from "./auth.admin.service.js";


export const createController = async (req, res) => {   
    const result = await AdminService.createAdmin(req.body);
    res.json(result);
}

export const loginController = async (req, res) => {    
    const result = await AdminService.login(req.body);
    res.json(result);
}

export const updateController = async (req, res) => {    
    const result = await AdminService.update(req.params.id, req.body);
    res.json(result);
}

export const AdminDetailController = async (req, res) => {
    const result = await AdminService.findById(req.params.id);
    res.json(result);
}

export const DeleteOneAdminController = async (req, res) => {
    const result = await AdminService.delete(req.params.id);
    res.json(result);
}