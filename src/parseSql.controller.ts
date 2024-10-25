import fs from 'fs';
import path from 'path';

import { data } from './test';

/**
 * Antes de hacer esto manualmente se debe convertir el archivo en ts,
 * cambiar los NULL por null
 * cambiar los [] por ()
 * las ; por ,
 * ingresarlo en una variable tipo array export const data = [];
 */
export const parseSqlController = async () => {
    try {
        const insertStatements = [];
        const batchSize = 500;
        const columnNames = "(`TB_PEDIDOS_CLIENTE`, `TB_PEDIDOS_MARCA`, `TB_PEDIDOS_CODIGO_ZONA`, `TB_PEDIDOS_NOMBRE_ZONA`, `TB_PEDIDOS_CIUDAD`, `TB_PEDIDOS_CAMPANA`, `TB_PEDIDOS_FECHA`, `TB_PEDIDOS_NRO_FACTURA`, `TB_PEDIDOS_NRO_PEDIDO`, `TB_PEDIDOS_CONSECUTIVO`, `TB_PEDIDOS_BARCODE_CAJA`, `TB_PEDIDOS_TIPO_PRODUCTO`, `TB_PEDIDOS_CONTENIDO_CAJA`, `TB_PEDIDOS_ID_ASESORA`, `TB_PEDIDOS_CEDULA`, `TB_PEDIDOS_NOMBRE_ASESORA`, `TB_PEDIDOS_DIRECCION_ASESORA`, `TB_PEDIDOS_DPTO_ASESORA`, `TB_PEDIDOS_BARRIO_ASESORA`, `TB_PEDIDOS_VEREDA`, `TB_PEDIDOS_MUNICIPIO_ENVIEXPRESS`, `TB_PEDIDOS_CELULAR_ASESORA`, `TB_PEDIDOS_MOVIL_ASESORA`, `TB_PEDIDOS_AUDITAR`, `TB_PEDIDOS_CAJAS`, `TIEMPO_TRANSITO_BODEGA`, `TIEMPO_BODEGA_REPARTO`, `TIEMPO_BODEGA_DIGITALIZADO`, `TIEMPO_TRANSITO_DIGITALIZADO`, `TIEMPO_REPARTO_DIGITALIZADO`, `TIPO_DE_CARGA`, `TIPO_DESTINO`, `PROMESA_HRS`, `ANS`, `METODO_DE_PAGO`, `ESTADO`, `EN_BODEGA_FECHA`, `EN_REPARTO_FECHA`, `ESTADO_ENTREGADO`, `EN_ENTREGADO_FECHA`, `DIGITALIZADO_FECHA`, `SINIESTRO_FECHA`, `ESTADO_DIGITALIZADO`, `ESTADO_NO_ENTREGADO`, `EN_NO_ENTREGADO_FECHA`, `ESTADO_REENVIO`, `EN_REENVIO_FECHA`, `EN_RETORNO_FECHA`, `REZAGO_FECHA`, `NOVEDAD`, `NOTA`, `NOTAS_DE_OPERACION`, `CEDI`, `ACTIVO`, `FECHA_HORA`, `FECHA`, `CODIGO_DE_CARGA`, `ORDEN_DE_SERVICIO`, `ORDEN_DE_DESPACHO`, `PLACA`, `PLACA_DE_REPARTO`, `TRANSPORTADOR`, `FECHA_CARGA`, `ENCONTRADO_EN_CONTEO`, `CONSECUTIVO_CONTEO`, `CODIGO_DE_CARGUE`, `MANIFIESTO_URBANO`, `CODIGO_DE_REENVIO`, `CODIGO_DE_RETORNO`, `ESTADO_SEGMENTACION_DE_CONTEO`, `ESTADO_CODIGO_DE_ZONA`, `CODIGO_CIUDAD`, `MAIL_GROUP`, `PLACA_MP`, `NOMBRE_CONDUCTOR`, `LINK`, `FOTOGRAFIA`, `TEST`, `VR_UNITARIO_MANIFIESTO`, `USUARIO_REGISTRO`, `USUARIO_EN_BODEGA`, `USUARIO_EN_REPARTO`, `TOKEN`, `DESPACHO_API`, `DESPACHO_ID`, `CODE_STATUS`, `EN_TRANSBORDO_FECHA`, `CHECK_TRANSITO`, `CHECK_TRANSITO_A_CEDI`, `CHECK_EN_BODEGA_VERIFICACION`, `CHECK_EN_BODEGA`, `CHECK_EN_REPARTO`, `CHECK_DIGITALIZADO`, `RADICADO`, `RADICADOSC`, `ESTADO_MOVE`, `ESTADO_MOVE_RECORDS`, `ESTADO_MOVE_EC`, `CODIGO_FLETE`, `VR_UNITARIO_DIST`, `VR_UNITARIO_VEREDA_DIST`, `VR_ADICIONAL_DIST`, `VR_FLETE_DIST`, `OTROS_COSTOS_DIST`, `PRE_LIQUIDACION`, `FECHA_PRE_LIQUIDACION`, `ESTADO_PRE_LIQUIDACION`, `REGISTRO_MOVIDO_PRE_LIQUIDACION`, `ORDEN_DE_COMPRA`, `FECHA_ORDEN_DE_COMPRA`, `VR_FAC`, `VR_FTE_FAC`, `NO_FAC`, `FECHA_FAC`, `ESTADO_TRACKING`, `ESTADO_PRELIQUIDACION`, `NTF_EN_REPARTO`, `NTF_DIGITALIZADO`, `RUTA`, `FECHA_PROMESA`)"; // Add all column names here

        for(let i = 0; i < data.length; i += batchSize) {
            const batch = data.slice(i, i + batchSize)
                .map(innerArray => innerArray.slice(1))
                .map(innerArray => `(${innerArray.map(item => item === null ? 'NULL' : (typeof item === 'string' ? `'${item}'` : item)).join(', ')})`)
                .join(',\n');

            insertStatements.push(`INSERT IGNORE INTO \`TB_PEDIDOS_DIGITALIZADO\` ${columnNames} VALUES\n${batch};`);
        }

        // Unimos todas las sentencias en una cadena de texto
        const finalQuery = insertStatements.join('\n\n');
        const filePath = path.join(__dirname, './new.sql');

        fs.writeFileSync(filePath, `${finalQuery}`, 'utf8');
    } catch(error) {
        console.log(error);
    }
};
parseSqlController();