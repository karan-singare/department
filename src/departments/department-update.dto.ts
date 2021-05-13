import { ApiProperty } from "@nestjs/swagger";

export class DepartmentUpdateDto {
  @ApiProperty({
    type: String,
    description:
      'Name of the employee to be updated',
  })
  deptName: string;
}
