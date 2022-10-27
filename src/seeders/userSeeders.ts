import { DataSource } from 'typeorm';
import {Seeder, SeederFactoryManager} from 'typeorm-extension'
import bcrypt from 'bcrypt'
import { User } from '../entities/User';

export class UserSeeder implements Seeder {
    async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
       const userRepository = dataSource.getRepository(User)

       const userData = {
        name: "teste",
        email: "teste@teste.com",
        appartament: "302",
        password: await bcrypt.hash('teste', 10)
       }

       const newUser = userRepository.create(userData)
       await userRepository.save(newUser)
    }
}