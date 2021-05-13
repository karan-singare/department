import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from "@nestjs/common";
import { DeleteResult, UpdateResult } from "typeorm";
import { ApiBody, ApiCreatedResponse, ApiOkResponse } from "@nestjs/swagger";
import { DepartmentsService } from "./departments.service";
import { DepartmentFilterDto } from "./department-filter.dto";
import { Department } from "./department.entity";
import { DepartmentCreateDto } from "./department-create.dto";
import { DepartmentUpdateDto } from "./department-update.dto";

@Controller('departments')
export class DepartmentsController {
  constructor(private departmentsService: DepartmentsService) {}

  @Get()
  @ApiOkResponse({
    description: 'Get All the departments',
  })
  @ApiBody({
    type: DepartmentFilterDto,
  })
  public async getEmployees(
    @Query() searchFilter: DepartmentFilterDto,
  ): Promise<Department[]> {
    return this.departmentsService.getEmployees(searchFilter);
  }

  @ApiOkResponse({
    description: 'Get department By ID',
  })
  @Get(':id')
  public async getEmployeeById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Department> {
    return this.departmentsService.getEmployeeById(id);
  }

  @Post()
  @ApiCreatedResponse({
    description: 'Department Creation',
  })
  @ApiBody({
    type: DepartmentCreateDto,
  })
  public async createEmployee(
    @Body() createEmployeeDto: DepartmentCreateDto,
  ): Promise<Department> {
    return this.departmentsService.createEmployee(createEmployeeDto);
  }

  @Put(':id')
  @ApiBody({
    type: DepartmentUpdateDto,
  })
  public async updateEmployee(
    @Param('id', ParseIntPipe) id: number,
    @Body() departmentUpdateDto: DepartmentUpdateDto,
  ): Promise<UpdateResult> {
    return this.departmentsService.updateEmployee(id, departmentUpdateDto);
  }

  @Delete(':id')
  public async deleteEmployee(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<DeleteResult> {
    return this.departmentsService.deleteEmployee(id);
  }
}
