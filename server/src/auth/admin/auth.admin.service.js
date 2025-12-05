import mongoose from 'mongoose';
import { UserService } from '../user/services/user.service.js';
import { Admin } from './admin.model.js';
import { passwordUtil } from '../../utils/BCrypt.js';

class adminService {
  async createAdmin(data) {
    const session = await mongoose.startSession();
    try {
      session.startTransaction();
      const user = await UserService.createUser({ role: 'ADMIN' }, session);

      const checkEmail = await Admin.findOne({ email: data.email });

      if (checkEmail)
        return {
          status: 400,
          success: false,
          message: 'Email already exsist',
        }
      
      const hashedPassword = await passwordUtil.hash(data.password);

      const result = await Admin.create([{ ...data, password: hashedPassword ,user: user[0]._id }], {
        session,
      });

      if (!result) throw new Error('Create account admin failed');

      await session.commitTransaction();

      return {
        status: 201,
        success: true,
        data: result[0],
      };
    } catch (error) {
      await session.abortTransaction();
      return {
        status: 500,
        success: false,
        message: 'Internal server error',
        error: error.message,
      };
    } finally {
      session.endSession();
    }
  }

  async login(data) {
    try {
      const findEmail = await Admin.findOne({ email: data.email });

      if (!findEmail)
        return {
          status: 404,
          success: false,
          message: 'Email not found',
        };

      const matchPassword = passwordUtil.compare(data.password, findEmail.password);

      if (!matchPassword)
        return {
          status: 400,
          success: false,
          message: 'Wrong password',
        };
        
      return {
        status: 200,
        success: true,
        message: 'login successfull',
      };
    } catch (error) {
      return {
        status: 500,
        success: false,
        message: 'Internal server error',
        error: error.message,
      };
    }
  }

  async findById(_id) {
    try {
      const result = await Admin.findById(_id).exec();
      return result;
    } catch (error) {
      return {
        status: 500,
        success: false,
        message: 'Internal server error',
        error: error.message,
      };
    }
  }

  async update(_id, data) {
    try {
      const result = await Admin.findByIdAndUpdate(_id, data, { new: true });
      return {
        status: 200,
        success: true,
        data: result,
      };
    } catch (error) {
      return {
        status: 500,
        success: false,
        message: 'Internal server error',
        error: error.message,
      };
    }
  }

  async delete(_id) {
    const session = await mongoose.startSession();
    try {
      session.startTransaction();
      const admin = await Admin.findById(_id).session();
      if (!admin)
        return {
          status: 400,
          success: false,
          message: 'Admin not found',
        };
      await Admin.findByIdAndDelete(_id, { session });

      if (admin.user) {
        await UserService.deleteUser(admin.user);
      }

      await session.commitTransaction();

      return {
        status: 200,
        success: true,
        message: 'Delete successfull',
      };
    } catch (error) {
      await session.abortTransaction();
      return {
        status: 500,
        success: false,
        message: 'Internal server error',
        error: error.message,
      };
    } finally {
      session.endSession();
    }
  }
}

export const AdminService = new adminService();