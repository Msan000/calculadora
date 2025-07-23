
import React from 'react';
import { Category, GlossaryEntry } from './types';

// SVG Icons for categories
const BrickIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>;
const PaintBrushIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>;
const LayersIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" /></svg>;
const CubeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>;
const GridIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6z" /></svg>;
const WallIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor"><path d="M4 5v14h16V5H4zm2 2h3v3H6V7zm5 0h3v3h-3V7zm5 0h3v3h-3V7zm-5 5h3v3h-3v-5zm-5 0h3v3H6v-3zm10 0h3v3h-3v-3z" /></svg>;
const JoistIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16M8 4v16m8-16v16" /></svg>;
const BeamIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4m14-8H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2z" /></svg>;
const ShieldIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 20.944a11.955 11.955 0 0018 0c0-1.22-.182-2.404-.52-3.536M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const CeilingIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 10h16M4 14h16M10 4v16m4-16v16" /></svg>;
export const BookIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>;

export const GLOSSARY_DATA: GlossaryEntry[] = [
    { term: 'Acero de Construcción', definition: 'Comúnmente llamado "hierro". Barras de acero corrugado que se usan como refuerzo en estructuras de hormigón armado para soportar esfuerzos de tracción.' },
    { term: 'Aditivo', definition: 'Sustancia química que se añade al hormigón, mortero o pintura para modificar sus propiedades, como acelerar el secado, mejorar la impermeabilidad o aumentar la plasticidad.' },
    { term: 'Aislación Hidrófuga', definition: 'Tratamiento o barrera que impide el paso del agua y/o la humedad. Puede ser vertical (en muros) u horizontal (en cimientos).' },
    { term: 'Aislación Térmica', definition: 'Material que se utiliza para reducir la transferencia de calor entre el interior y el exterior de una vivienda, mejorando el confort y la eficiencia energética.' },
    { term: 'Alambre de Atar', definition: 'Alambre de acero recocido (negro) que se utiliza para atar las barras de acero en las armaduras de hormigón.' },
    { term: 'Arena', definition: 'Agregado fino proveniente de la trituración de rocas. Se clasifica en fina, media y gruesa según su granulometría y se usa en morteros y hormigones.' },
    { term: 'Armadura', definition: 'Conjunto de barras de acero (hierro) y estribos que se colocan dentro de los encofrados antes de verter el hormigón para formar una estructura de hormigón armado.' },
    { term: 'Bovedilla', definition: 'Bloque de cerámica, hormigón o poliestireno expandido (telgopor) que se coloca entre las viguetas para aligerar el peso de una losa alivianada.' },
    { term: 'Cal', definition: 'Material conglomerante. Existen dos tipos principales: la cal hidráulica (para morteros resistentes) y la cal aérea (para revoques finos y pinturas).' },
    { term: 'Cantonera', definition: 'Perfil metálico o de PVC que se coloca en las esquinas de los muros antes de revocar o en sistemas de construcción en seco para protegerlas y darles un acabado recto.' },
    { term: 'Capa Aisladora', definition: 'Barrera impermeable, horizontal o vertical, que se coloca en cimientos y muros para impedir el paso de la humedad del suelo a la pared (humedad de cimientos).' },
    { term: 'Carpeta de Nivelación', definition: 'Capa de mortero que se aplica sobre un contrapiso para obtener una superficie lisa, nivelada y apta para recibir el piso final (cerámicos, madera, etc.).' },
    { term: 'Cemento', definition: 'Conglomerante hidráulico en polvo que, mezclado con agua y agregados, forma hormigones y morteros. El más común es el Cemento Portland.' },
    { term: 'Cemento de Albañilería', definition: 'Producto que combina cemento y aditivos plastificantes (reemplaza la mezcla de cemento y cal). Ideal para mampostería y revoques gruesos. Ejemplo: Plasticor.' },
    { term: 'Cerámico', definition: 'Placa de arcilla cocida, esmaltada o no, utilizada como revestimiento para pisos y paredes. Es poroso y más económico que el porcelanato.' },
    { term: 'Cielorraso', definition: 'Superficie que constituye la parte inferior del techo. Puede ser de yeso aplicado, placas de yeso (Durlock), PVC, madera, etc.' },
    { term: 'Columna', definition: 'Elemento estructural vertical, generalmente de hormigón armado, que transmite las cargas de las vigas y losas a las fundaciones.' },
    { term: 'Contrapiso', definition: 'Capa de hormigón pobre (de bajo contenido de cemento) que se coloca sobre el terreno compactado para crear una base resistente y nivelada para la carpeta y el piso.' },
    { term: 'Dintel', definition: 'Pequeña viga que se coloca encima de aberturas (puertas y ventanas) para soportar el peso del muro superior y evitar que el marco se deforme.' },
    { term: 'Dosificación', definition: 'Proporción en volumen o peso de los componentes de un mortero u hormigón. Por ejemplo, 1:3:3 significa 1 parte de cemento, 3 de arena y 3 de piedra.' },
    { term: 'Encadenado', definition: 'Vigas o columnas de hormigón armado que se construyen en la parte superior, inferior o en los bordes de los muros para "atar" la estructura, repartir cargas y evitar grietas.' },
    { term: 'Encofrado', definition: 'Molde temporal, generalmente de madera o metal, dentro del cual se vierte el hormigón fresco hasta que endurece y adquiere la forma deseada.' },
    { term: 'Enduido Plástico', definition: 'Masilla que se utiliza para corregir pequeñas imperfecciones en paredes (fisuras, poros) antes de pintar, logrando una superficie lisa.' },
    { term: 'Estribo', definition: 'Barra de acero de menor diámetro, doblada en forma rectangular o circular, que "abraza" las barras principales de una viga o columna para evitar que se pandeen.' },
    { term: 'Fijador Sellador', definition: 'Líquido que se aplica antes de la pintura para sellar la porosidad de la pared, unificar la absorción y mejorar el rendimiento de la pintura de acabado.' },
    { term: 'Fraguado', definition: 'Proceso químico de endurecimiento y adquisición de resistencia del hormigón o mortero tras su mezcla con agua.' },
    { term: 'Hormigón', definition: 'Material de construcción formado por la mezcla de cemento, arena, piedra (agregado grueso) y agua. Al fraguar, adquiere gran resistencia. Se usa para estructuras.' },
    { term: 'Impermeabilizante', definition: 'Producto que se aplica sobre una superficie para hacerla impermeable al agua. Puede ser una membrana, pintura o aditivo.' },
    { term: 'Junta', definition: 'Espacio que se deja entre dos materiales (ladrillos, cerámicos) para permitir dilataciones y contracciones. Se rellena con mortero o pastina.' },
    { term: 'Ladrillo', definition: 'Pieza de arcilla cocida, generalmente rectangular, utilizada para construir muros (mampostería). Existen varios tipos: común, hueco, portante, etc.' },
    { term: 'Losa', definition: 'Elemento estructural plano y horizontal que forma los pisos y techos de un edificio. Puede ser de hormigón armado macizo o alivianada (con viguetas y bovedillas).' },
    { term: 'Malla Electrosoldada', definition: 'Red de alambres de acero que se cruzan y están soldados en sus puntos de encuentro. Se usa como armadura en losas y contrapisos para controlar la fisuración.' },
    { term: 'Mampostería', definition: 'Obra hecha con ladrillos, bloques o piedras unidos con mortero. Se usa para construir paredes y muros. Puede ser portante (soporta cargas) o de cerramiento.' },
    { term: 'Membrana Asfáltica', definition: 'Rollo de material bituminoso, a menudo con una capa de aluminio, que se utiliza para impermeabilizar techos, terrazas y cimientos.' },
    { term: 'Montante', definition: 'Perfil vertical de acero galvanizado que, junto con las soleras, forma la estructura principal de tabiques y cielorrasos en la construcción en seco.' },
    { term: 'Mortero', definition: 'Mezcla de un conglomerante (cemento, cal), agregado fino (arena) y agua. Se usa para pegar ladrillos, hacer revoques y contrapisos.' },
    { term: 'Pastina', definition: 'Mortero fino y con aditivos de color que se usa para rellenar las juntas entre cerámicos, porcelanatos o azulejos.' },
    { term: 'Piedra Partida', definition: 'Agregado grueso (grava) obtenido por trituración de rocas. Es un componente esencial del hormigón.' },
    { term: 'Placa de Yeso', definition: 'Panel compuesto por un núcleo de yeso recubierto por ambas caras con cartón. Es la base de la construcción en seco (Durlock, Knauf).' },
    { term: 'Platea de Fundación', definition: 'Losa de hormigón armado que cubre toda la superficie de la construcción y sirve como cimiento, repartiendo el peso de la estructura de manera uniforme en el terreno.' },
    { term: 'Porcelanato', definition: 'Revestimiento cerámico de muy alta resistencia y muy baja absorción de agua. Es más duradero y menos poroso que el cerámico común.' },
    { term: 'Revoque', definition: 'Capa de mortero que se aplica a paredes y techos para alisarlos, protegerlos y darles un acabado. Puede ser grueso, fino o hidrófugo.' },
    { term: 'Solera', definition: 'Perfil horizontal de acero galvanizado (en forma de "U") que se fija al piso y al techo para alojar y guiar a los montantes en la construcción en seco.' },
    { term: 'Tabique', definition: 'Pared delgada que no soporta cargas estructurales y se utiliza para dividir espacios interiores.' },
    { term: 'Viga', definition: 'Elemento estructural horizontal, generalmente de hormigón armado o acero, que soporta el peso de losas o techos y lo transmite a las columnas o muros.' },
    { term: 'Vigueta', definition: 'Elemento prefabricado de hormigón pretensado que, junto con las bovedillas, forma la estructura de una losa alivianada.' },
    { term: 'Zapata', definition: 'Base de hormigón armado, generalmente cuadrada o rectangular, que se coloca bajo una columna para repartir el peso de la estructura en el terreno y evitar que se hunda.' },
    { term: 'Zócalo', definition: 'Banda que se coloca en la parte inferior de las paredes, en la unión con el piso, para protegerlas de golpes y dar un acabado estético.' },
];

export interface CategoryDetail {
  title: string;
  description: string;
  icon: React.ReactNode;
  inputs: {
    name: string;
    label: string;
    type: string;
    placeholder: string;
    validation?: {
      warnAt: number;
      message: string;
    };
  }[];
  materialOptions?: {
    name: string;
    label: string;
    options: {
      value: string;
      label: string;
    }[];
  };
  expertSettings?: {
    name: string;
    label: string;
    type: string;
    placeholder: string;
  }[];
}


export const CATEGORY_DETAILS: Record<Category, CategoryDetail> = {
  [Category.MAMPOSTERIA]: {
    title: 'Mampostería',
    description: 'Calculá ladrillos, cemento y arena para tus paredes.',
    icon: <BrickIcon />,
    inputs: [
      { name: 'largo', label: 'Largo de la pared (m)', type: 'number', placeholder: 'Ej: 10', validation: { warnAt: 50, message: '¿Seguro que la pared es tan larga?' } },
      { name: 'alto', label: 'Alto de la pared (m)', type: 'number', placeholder: 'Ej: 2.6', validation: { warnAt: 6, message: 'Una altura mayor a 6m es inusual.' } },
    ],
    materialOptions: {
      name: 'tipoLadrillo',
      label: 'Tipo de ladrillo',
      options: [
        { value: 'comun', label: 'Ladrillo Común 5x11x23cm (de canto)' },
        { value: 'hueco12', label: 'Ladrillo Hueco 12x18x33cm' },
        { value: 'hueco18', label: 'Ladrillo Hueco 18x18x33cm' },
        { value: 'bloqueHormigon13', label: 'Bloque Hormigón 13x19x39cm' },
        { value: 'bloqueHormigon19', label: 'Bloque Hormigón 19x19x39cm' },
      ]
    },
    expertSettings: [
        { name: 'morteroM3PorM2', label: 'Volumen de Mortero (m³/m²)', type: 'number', placeholder: 'Ej: 0.023' },
        { name: 'cementoPorM3', label: 'Bolsas Cemento por m³ Mortero', type: 'number', placeholder: 'Ej: 7.5' },
        { name: 'arenaPorM3', label: 'Arena por m³ Mortero', type: 'number', placeholder: 'Ej: 1.05' },
    ]
  },
  [Category.REVOQUES]: {
    title: 'Revoques',
    description: 'Calculá materiales para revoque grueso, fino o hidrófugo.',
    icon: <WallIcon />,
    inputs: [
      { name: 'area', label: 'Superficie a revocar (m²)', type: 'number', placeholder: 'Ej: 26', validation: { warnAt: 500, message: 'Superficie muy grande, ¿es correcta?' } },
      { name: 'espesor', label: 'Espesor del revoque (cm)', type: 'number', placeholder: 'Ej: 1.5', validation: { warnAt: 10, message: 'Un espesor mayor a 10cm es inusual.' } },
    ],
    materialOptions: {
      name: 'tipoRevoque',
      label: 'Tipo de revoque',
      options: [
        { value: 'grueso', label: 'Grueso a la cal (Exterior)' },
        { value: 'fino', label: 'Fino a la cal (Interior)' },
        { value: 'hidrofugo', label: 'Hidrófugo (Capa Aisladora)' },
      ]
    },
    expertSettings: [
        { name: 'proporcionCemento', label: 'Partes de Cemento', type: 'number', placeholder: 'Ej: 1' },
        { name: 'proporcionCal', label: 'Partes de Cal', type: 'number', placeholder: 'Ej: 1' },
        { name: 'proporcionArena', label: 'Partes de Arena', type: 'number', placeholder: 'Ej: 4' },
    ]
  },
  [Category.HORMIGON_HIERRO]: {
    title: 'Hormigón y Hierro',
    description: 'Calculá hormigón y la cantidad de hierro para estructuras.',
    icon: <CubeIcon />,
    inputs: [
      { name: 'largo', label: 'Largo (m)', type: 'number', placeholder: 'Ej: 5', validation: { warnAt: 50, message: 'Medida muy grande, verificar.' } },
      { name: 'ancho', label: 'Ancho (m)', type: 'number', placeholder: 'Ej: 0.2', validation: { warnAt: 5, message: 'Medida muy grande, verificar.' } },
      { name: 'espesor', label: 'Espesor / Alto (m)', type: 'number', placeholder: 'Ej: 0.3', validation: { warnAt: 5, message: 'Medida muy grande, verificar.' } },
    ],
    materialOptions: {
      name: 'tipoElemento',
      label: 'Tipo de Elemento Estructural',
      options: [
        { value: 'columnas', label: 'Columnas (H-21)' },
        { value: 'vigas', label: 'Vigas (H-21)' },
        { value: 'zapatas', label: 'Bases o Zapatas (H-21)' },
        { value: 'platea', label: 'Platea o Viga de Fundación (H-17)' },
      ]
    },
    expertSettings: [
        { name: 'cementoPorM3', label: 'Bolsas Cemento por m³ Hormigón', type: 'number', placeholder: 'Ej: 7' },
        { name: 'arenaPorM3', label: 'Arena por m³ Hormigón', type: 'number', placeholder: 'Ej: 0.5' },
        { name: 'piedraPorM3', label: 'Piedra por m³ Hormigón', type: 'number', placeholder: 'Ej: 0.9' },
        { name: 'hierroPorM3', label: 'Kg de Hierro por m³ Hormigón', type: 'number', placeholder: 'Ej: 110' },
    ]
  },
   [Category.LOSAS]: {
    title: 'Losas Alivianadas',
    description: 'Calculá viguetas, bovedillas y hormigón para tu losa.',
    icon: <JoistIcon />,
    inputs: [
      { name: 'area', label: 'Superficie de la losa (m²)', type: 'number', placeholder: 'Ej: 20', validation: { warnAt: 300, message: 'Superficie muy grande, ¿es correcta?' } },
    ],
     materialOptions: {
      name: 'tipoBovedilla',
      label: 'Tipo de Bovedilla',
      options: [
        { value: 'poliestireno', label: 'Bovedilla de Poliestireno (Telgopor)' },
        { value: 'ceramica', label: 'Bovedilla Cerámica' },
        { value: 'hormigon', label: 'Bovedilla de Hormigón' },
      ]
    }
  },
  [Category.ENCADENADOS]: {
    title: 'Encadenados y Dinteles',
    description: 'Calculá materiales para vigas de encadenado y dinteles.',
    icon: <BeamIcon />,
    inputs: [
        { name: 'largo', label: 'Longitud total (m)', type: 'number', placeholder: 'Ej: 25', validation: { warnAt: 200, message: 'Longitud muy grande, ¿es correcta?' } },
    ],
    materialOptions: {
        name: 'seccion',
        label: 'Sección del elemento',
        options: [
            { value: '15x15', label: '15cm x 15cm' },
            { value: '15x20', label: '15cm x 20cm' },
            { value: '20x20', label: '20cm x 20cm' },
        ]
    }
  },
  [Category.CONTRAPISOS_CARPETAS]: {
    title: 'Contrapisos y Carpetas',
    description: 'Calculá materiales para nivelar tus pisos.',
    icon: <LayersIcon />,
    inputs: [
      { name: 'area', label: 'Superficie a cubrir (m²)', type: 'number', placeholder: 'Ej: 20', validation: { warnAt: 500, message: 'Superficie muy grande, ¿es correcta?' } },
      { name: 'espesor', label: 'Espesor (cm)', type: 'number', placeholder: 'Ej: 8', validation: { warnAt: 20, message: 'Un espesor mayor a 20cm es inusual.' } },
    ],
    materialOptions: {
      name: 'tipoCapa',
      label: 'Tipo de capa',
      options: [
        { value: 'contrapiso', label: 'Contrapiso de Hormigón Pobre' },
        { value: 'carpeta', label: 'Carpeta de Nivelación' },
      ]
    }
  },
  [Category.AISLACIONES]: {
    title: 'Aislaciones e Impermeabilizaciones',
    description: 'Calculá membranas y aislaciones para cimientos y techos.',
    icon: <ShieldIcon />,
    inputs: [
        { name: 'area', label: 'Superficie a tratar (m²)', type: 'number', placeholder: 'Ej: 70', validation: { warnAt: 500, message: 'Superficie muy grande, ¿es correcta?' } },
    ],
    materialOptions: {
        name: 'tipoAislacion',
        label: 'Tipo de Aislación',
        options: [
            { value: 'capaHorizontal', label: 'Capa Aisladora Horizontal (Mortero)' },
            { value: 'membranaLiquida', label: 'Membrana Líquida para Techos' },
            { value: 'membranaAluminio', label: 'Membrana con Aluminio para Techos' },
        ]
    }
  },
  [Category.REVESTIMIENTOS]: {
    title: 'Revestimientos, Pisos y Zócalos',
    description: 'Calculá cerámicos, adhesivo, pastina y zócalos.',
    icon: <GridIcon />,
    inputs: [
      { name: 'area', label: 'Superficie a revestir (m²)', type: 'number', placeholder: 'Ej: 20', validation: { warnAt: 500, message: 'Superficie muy grande, ¿es correcta?' } },
      { name: 'perimetro', label: 'Perímetro para zócalos (ml) (Opcional)', type: 'number', placeholder: 'Ej: 18', validation: { warnAt: 200, message: 'Perímetro muy grande, ¿es correcto?' } },
    ],
    materialOptions: {
      name: 'tipoRevestimiento',
      label: 'Tipo de adhesivo (según llana)',
      options: [
        { value: 'llana6', label: 'Adhesivo con llana de 6mm' },
        { value: 'llana10', label: 'Adhesivo con llana de 10mm' },
      ]
    }
  },
    [Category.CIELORRASOS]: {
    title: 'Cielorrasos de Placas',
    description: 'Calculá placas de yeso, perfiles, tornillos y masilla.',
    icon: <CeilingIcon />,
    inputs: [
        { name: 'area', label: 'Superficie del cielorraso (m²)', type: 'number', placeholder: 'Ej: 15', validation: { warnAt: 300, message: 'Superficie muy grande, ¿es correcta?' } },
    ],
    materialOptions: {
        name: 'tipoPlaca',
        label: 'Tipo de Placa de Yeso',
        options: [
            { value: 'estandar', label: 'Placa Estándar (12.5mm)' },
            { value: 'resistenteHumedad', label: 'Placa Resistente a la Humedad (Verde)' },
        ]
    }
  },
  [Category.PINTURA]: {
    title: 'Pintura y Revestimientos Texturados',
    description: 'Calculá la cantidad de pintura, fijador o revestimiento.',
    icon: <PaintBrushIcon />,
    inputs: [
      { name: 'area', label: 'Superficie a pintar o revestir (m²)', type: 'number', placeholder: 'Ej: 50', validation: { warnAt: 1000, message: 'Superficie muy grande, ¿es correcta?' } },
      { name: 'manos', label: 'Cantidad de manos', type: 'number', placeholder: '2' },
    ],
    materialOptions: {
      name: 'tipoPintura',
      label: 'Tipo de producto',
      options: [
        { value: 'latexInterior', label: 'Látex Interior / Cielorraso' },
        { value: 'latexExterior', label: 'Látex Exterior / Impermeabilizante' },
        { value: 'revestimientoTexturado', label: 'Revestimiento Plástico Texturado' },
      ]
    }
  }
};
