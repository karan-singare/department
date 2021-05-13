import { SortType } from './sort-type.enum';
import { ApiProperty } from '@nestjs/swagger';

export class DepartmentFilterDto {
  @ApiProperty({
    type: String,
    description:
      'Keyword for searching the Department it can be name of the employee or department of the employee',
  })
  search: string;

  @ApiProperty({
    type: String,
    description: 'Type of Sorting Ascending or Descending',
  })
  sort: SortType;

  @ApiProperty({
    type: String,
    description:
      'Sorting should be based on what..it can be deptId or deptName',
  })
  sortCriteria: string;
}
