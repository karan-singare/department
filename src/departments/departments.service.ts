import { Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Department } from "./department.entity";
import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { DepartmentFilterDto } from "./department-filter.dto";
import { DepartmentCreateDto } from "./department-create.dto";
import { DepartmentUpdateDto } from "./department-update.dto";

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectRepository(Department)
    private readonly departmentRepository: Repository<Department>,
  ) {}

  private logger = new Logger();

  public async getEmployees(
    filterDto: DepartmentFilterDto,
  ): Promise<Department[]> {

    const { search, sort, sortCriteria } = filterDto;
    const query = this.departmentRepository.createQueryBuilder('department');

    if (search) {
      query.andWhere(
        'department.deptName LIKE :search',
        { search: `%${search}%` },
      );
    }

    if (sort && !sortCriteria) {
      if (sort.toUpperCase() === 'ASC') {
        query.orderBy('department.deptId', 'ASC');
      } else if (sort.toUpperCase() === 'DESC') {
        query.orderBy('department.deptId', 'DESC');
      }
    } else if (sort && sortCriteria) {
      if (sort.toUpperCase() === 'ASC') {
        query.orderBy('department.' + sortCriteria, 'ASC');
      } else if (sort.toUpperCase() === 'DESC') {
        query.orderBy('department.' + sortCriteria, 'DESC');
      }
    }

    try {
      const employees = await query.getMany();
      return employees;
    } catch (error) {
      this.logger.error(`Failed to get Departments.`);
      this.logger.error(error.stack);
      throw new InternalServerErrorException();
    }

  }

  public async createEmployee(
    deptCreateDto: DepartmentCreateDto,
  ): Promise<Department> {
    const { deptName } = deptCreateDto;
    return this.departmentRepository.save({
      deptName,
    });
  }

  public async getEmployeeById(id: number): Promise<Department> {
    return this.departmentRepository.findOne(id);
  }

  public async updateEmployee(
    id: number,
    deptUpdateDto: DepartmentUpdateDto,
  ): Promise<UpdateResult> {
    return this.departmentRepository.update(id, deptUpdateDto);
  }

  public async deleteEmployee(id: number): Promise<DeleteResult> {
    return this.departmentRepository.delete(id);
  }
}
