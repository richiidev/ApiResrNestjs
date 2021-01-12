import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { CreateMensajeDto } from './dto/create-mensaje-dto';
import { MensajesService } from './mensajes.service';

@Controller()
export class MensajesController {

    constructor(private mensajesService: MensajesService){

    }

    @Post('save')
    create(@Body() createMensajeDto: CreateMensajeDto, @Res() response){
        this.mensajesService.createMensaje(createMensajeDto).then( mensaje => {
            response.status(HttpStatus.CREATED).json(mensaje);
        }

        )
    }

    @Get('mensajes')
    getAll(@Res() response){
         this.mensajesService.getAll().then( mensajeList =>{
            response.setHeader('Content-Type', 'text/event-stream');
             response.status(HttpStatus.OK).json(mensajeList);
         } 
             
         )            
    }

  

    @Put(':id')
    update(@Body() updateMensajeDto: CreateMensajeDto, @Res() response, @Param('id') idMensaje){
        this.mensajesService.updateMensaje(idMensaje,updateMensajeDto).then(
            mensaje => {
                response.status(HttpStatus.OK).json(mensaje); 
            }
        )
    }

    @Delete(':id')
    delete(@Res() response, @Param('id') idMensaje){
        this.mensajesService.deleteMensaje(idMensaje).then(
            mensaje => {
                response.status(HttpStatus.OK).json(mensaje); 
            }
        )
    }


}
