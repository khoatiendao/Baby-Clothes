import { validationBase } from "../../common/helpers/validation";
import { AdminDto, AdminLoginDto, UpdateAdminDto } from "./auth.admin.dto";
import { AdminService } from "./auth.admin.service";


export const createController = async (req, res) => {
    const data = validationBase(AdminDto);
    const result = await AdminService.createAdmin(data);
    res.status(result.status).json(result);
}

export const loginController = async (req, res) => {
    const data = validationBase(AdminLoginDto);
    const result = await AdminService.login(data);
    res.status(result.status).json(result);
}

export const updateController = async (req, res) => {
    const data = validationBase(UpdateAdminDto);
    const result = await AdminService.createAdmin(data);
    res.status(result.status).json(result);
}