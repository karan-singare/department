import { ApiProperty } from '@nestjs/swagger';

export class DepartmentCreateDto {
  @ApiProperty({
    type: String,
    description: 'Name of the Employee to be created',
  })
  deptName: string;
}
