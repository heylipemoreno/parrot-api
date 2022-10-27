import { UserSeeder } from './userSeeders';
import { PostSeeder } from './postSeeder'
import { DataSource } from 'typeorm';
import {runSeeder, Seeder, SeederFactoryManager } from 'typeorm-extension';

export class MainSeeder implements Seeder {
   async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
        await runSeeder(dataSource, UserSeeder)
        await runSeeder(dataSource, PostSeeder)
    }
}