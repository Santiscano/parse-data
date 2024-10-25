import fs from 'fs';

import { data } from './test';

function dividirArrayEnPartes(array: any[], numPartes: number): any[] {
    const longitudParte = Math.ceil(array.length / numPartes);
    const partes = [];

    for (let i = 0; i < numPartes; i++) {
        const inicio = i * longitudParte;
        const fin = inicio + longitudParte;
        partes.push(array.slice(inicio, fin));
    }

    return partes;
}

function guardarPartesEnArchivos(partes: any[]): void {
    partes.forEach((parte, index) => {
        const nombreArchivo = `dataParte${index + 1}.ts`;
        const contenido = `export const dataParte${index + 1} = ${JSON.stringify(parte, null, 2)};`;

        fs.writeFileSync(nombreArchivo, contenido, 'utf-8');
        console.log(`Archivo ${nombreArchivo} guardado con éxito.`);
    });
}

const partes = dividirArrayEnPartes(data, 5);
guardarPartesEnArchivos(partes);