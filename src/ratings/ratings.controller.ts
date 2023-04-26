import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RatingsService } from './ratings.service';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';

@ApiTags('Ratings')
@Controller('ratings')
export class RatingsController {
  constructor(private readonly ratingsService: RatingsService) {}

  @ApiSecurity('api_key')
  @Post()
  create(@Body() createRatingDto: CreateRatingDto) {
    return this.ratingsService.create(createRatingDto);
  }

  @Get()
  findAll() {
    return this.ratingsService.findAll();
  }

  @Get(':chart_id/:album_id')
  findOne(@Param('chart_id') chart_id: string, @Param('album_id') album_id: string) {
    return this.ratingsService.findOne(+chart_id, +album_id);
  }

  @ApiSecurity('api_key')
  @Patch(':chart_id/:album_id')
  update(@Param('chart_id') chart_id: string, @Param('album_id') album_id: string, @Body() updateRatingDto: UpdateRatingDto) {
    return this.ratingsService.update(+chart_id, +album_id, updateRatingDto);
  }

  @ApiSecurity('api_key')
  @Delete(':chart_id/:album_id')
  remove(@Param('chart_id') chart_id: string, @Param('album_id') album_id: string) {
    return this.ratingsService.remove(+chart_id, +album_id);
  }
}
