import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({
        type: String,
        description: 'Non-nullable; The username of the user.',
    })
    username!: string
}
