import { Category, MaterialResult, CalculationInput } from '../types';

const CEMENT_BAG_WEIGHT = 50; // kg

// Hormigón H-21 (1:2:3) para Estructuras
const H21_RECIPE = { cement: 7, sand: 0.5, stone: 0.9, aggregateName: 'Piedra Partida' };
// Hormigón H-17 (1:3:3) para Plateas
const H17_RECIPE = { cement: 6, sand: 0.6, stone: 0.8, aggregateName: 'Piedra Partida' };

const calculateMamposteria = (inputs: CalculationInput): MaterialResult[] => {
  const { largo, alto, tipoLadrillo } = inputs;
  const area = Number(largo) * Number(alto);
  const results: MaterialResult[] = [];

  const materials = {
    comun: { bricks: 60, mortarM3PerM2: 0.023 },
    hueco12: { bricks: 16, mortarM3PerM2: 0.015 },
    hueco18: { bricks: 16, mortarM3PerM2: 0.020 },
    bloqueHormigon13: { bricks: 12.5, mortarM3PerM2: 0.012 },
    bloqueHormigon19: { bricks: 12.5, mortarM3PerM2: 0.018 },
  };
  
  const material = materials[tipoLadrillo as keyof typeof materials];
  
  // Expert mode overrides
  const mortarM3PerM2 = Number(inputs.morteroM3PorM2) || material.mortarM3PerM2;
  const cementoPorM3 = Number(inputs.cementoPorM3) || 7.5;
  const arenaPorM3 = Number(inputs.arenaPorM3) || 1.05;

  results.push({ name: `Ladrillo ${tipoLadrillo}`, unit: 'unidades', quantity: area * material.bricks });
  const totalMortar = area * mortarM3PerM2;
  results.push({ name: 'Cemento', unit: 'bolsas (50kg)', quantity: totalMortar * cementoPorM3 });
  results.push({ name: 'Arena', unit: 'm³', quantity: totalMortar * arenaPorM3 });
  
  return results;
};

const calculateRevoques = (inputs: CalculationInput): MaterialResult[] => {
    const { area, espesor, tipoRevoque } = inputs;
    const surfaceArea = Number(area);
    const thicknessM = Number(espesor) / 100;
    const results: MaterialResult[] = [];
    const volume = surfaceArea * thicknessM;

    // Expert mode overrides
    const propCemento = Number(inputs.proporcionCemento);
    const propCal = Number(inputs.proporcionCal);
    const propArena = Number(inputs.proporcionArena);

    if (propCemento > 0 && propArena > 0) { // Expert mode calculation
        const totalParts = propCemento + propCal + propArena;
        const cementVol = (volume / totalParts) * propCemento;
        const calVol = (volume / totalParts) * propCal;
        
        results.push({ name: 'Cemento', unit: 'bolsas (50kg)', quantity: (cementVol * 1400) / CEMENT_BAG_WEIGHT }); // 1400 kg/m3 cement density
        if (calVol > 0) {
            results.push({ name: 'Cal', unit: 'bolsas (25kg)', quantity: (calVol * 600) / 25 }); // 600 kg/m3 cal density
        }
        results.push({ name: 'Arena', unit: 'm³', quantity: volume * 1.05 }); // Arena with 5% compaction factor
        
        if (tipoRevoque === 'hidrofugo') {
            const cementKg = (cementVol * 1400);
            results.push({ name: 'Aditivo Hidrófugo', unit: 'litros', quantity: cementKg / 10 });
        }
    } else { // Standard calculation
        if (tipoRevoque === 'hidrofugo') {
            const cementKg = volume * 480;
            const waterProoferLiters = cementKg / 10;
            results.push({ name: 'Cemento', unit: 'bolsas (50kg)', quantity: cementKg / CEMENT_BAG_WEIGHT });
            results.push({ name: 'Arena', unit: 'm³', quantity: volume * 1.05 });
            results.push({ name: 'Aditivo Hidrófugo', unit: 'litros', quantity: waterProoferLiters });
        } else if (tipoRevoque === 'grueso') {
            const cementoAlbañileriaBags = volume * 6; // Aprox 6 bolsas/m3
            results.push({ name: 'Cemento de Albañilería (Plasticor)', unit: 'bolsas (40kg)', quantity: cementoAlbañileriaBags });
            results.push({ name: 'Arena', unit: 'm³', quantity: volume * 1.0 });
        } else if (tipoRevoque === 'fino') {
            const limeKg = volume * 180;
            const cementKg = volume * 120;
            results.push({ name: 'Cal Fina Aérea', unit: 'bolsas (25kg)', quantity: limeKg / 25 });
            results.push({ name: 'Cemento', unit: 'bolsas (50kg)', quantity: cementKg / CEMENT_BAG_WEIGHT });
            results.push({ name: 'Arena Fina (tamizada)', unit: 'm³', quantity: volume * 1.1 });
        }
    }
    return results;
};

const calculateHormigonYHierro = (inputs: CalculationInput): MaterialResult[] => {
  const { largo, ancho, espesor, tipoElemento } = inputs;
  const volume = Number(largo) * Number(ancho) * Number(espesor);
  const results: MaterialResult[] = [];
  
  const rebarDensities = {
      columnas: 110, // kg/m³
      vigas: 90, // kg/m³
      zapatas: 65, // kg/m³
      platea: 25, // kg/m³
  };
  
  const defaultRecipe = tipoElemento === 'platea' ? H17_RECIPE : H21_RECIPE;
  const defaultRebarDensity = rebarDensities[tipoElemento as keyof typeof rebarDensities];

  // Expert mode overrides
  const cementoPorM3 = Number(inputs.cementoPorM3) || defaultRecipe.cement;
  const arenaPorM3 = Number(inputs.arenaPorM3) || defaultRecipe.sand;
  const piedraPorM3 = Number(inputs.piedraPorM3) || defaultRecipe.stone;
  const hierroPorM3 = Number(inputs.hierroPorM3) || defaultRebarDensity;

  results.push({ name: 'Cemento', unit: 'bolsas (50kg)', quantity: volume * cementoPorM3 });
  results.push({ name: 'Arena', unit: 'm³', quantity: volume * arenaPorM3 });
  results.push({ name: defaultRecipe.aggregateName, unit: 'm³', quantity: volume * piedraPorM3 });

  if(hierroPorM3 > 0) {
    const totalRebarKg = volume * hierroPorM3;
    results.push({ name: 'Hierro de Construcción', unit: 'kg', quantity: totalRebarKg });
    results.push({ name: 'Alambre de Atar', unit: 'kg', quantity: totalRebarKg / 1000 * 5 });
  }
  
  return results;
};

const calculateLosas = (inputs: CalculationInput): MaterialResult[] => {
    const { area, tipoBovedilla } = inputs;
    const surfaceArea = Number(area);
    const results: MaterialResult[] = [];
    
    results.push({ name: 'Viguetas Pretensadas', unit: 'ml', quantity: surfaceArea });
    results.push({ name: `Bovedillas de ${tipoBovedilla}`, unit: 'unidades', quantity: surfaceArea * 8 }); // aprox 8 a 10, usemos 8
    
    // Capa de compresión (5cm espesor)
    const concreteVolume = surfaceArea * 0.05;
    results.push({ name: 'Cemento (para capa compresión)', unit: 'bolsas (50kg)', quantity: concreteVolume * H21_RECIPE.cement });
    results.push({ name: 'Arena (para capa compresión)', unit: 'm³', quantity: concreteVolume * H21_RECIPE.sand });
    results.push({ name: 'Piedra Partida (para capa compresión)', unit: 'm³', quantity: concreteVolume * H21_RECIPE.stone });
    
    const rebarKg = surfaceArea * 1.5; // Malla electrosoldada 15x15 4.2mm, aprox 1.5 kg/m2
    results.push({ name: 'Malla de Hierro (4.2mm 15x15)', unit: 'kg', quantity: rebarKg });
    results.push({ name: 'Alambre de Atar', unit: 'kg', quantity: rebarKg / 1000 * 5 });

    return results;
};

const calculateEncadenados = (inputs: CalculationInput): MaterialResult[] => {
    const { largo, seccion } = inputs;
    const [ancho, alto] = (seccion as string).split('x').map(Number);
    const volume = (ancho / 100) * (alto / 100) * Number(largo);
    const results: MaterialResult[] = [];

    results.push({ name: 'Cemento', unit: 'bolsas (50kg)', quantity: volume * H21_RECIPE.cement });
    results.push({ name: 'Arena', unit: 'm³', quantity: volume * H21_RECIPE.sand });
    results.push({ name: 'Piedra Partida', unit: 'm³', quantity: volume * H21_RECIPE.stone });

    const totalRebarKg = Number(largo) * 2.5; // Aprox. 2.5 kg/ml for 4Ø8 + estribos Ø6c20
    results.push({ name: 'Hierro de Construcción', unit: 'kg', quantity: totalRebarKg });
    results.push({ name: 'Alambre de Atar', unit: 'kg', quantity: totalRebarKg / 1000 * 5 });

    return results;
};

const calculateContrapisosCarpetas = (inputs: CalculationInput): MaterialResult[] => {
    const { area, espesor, tipoCapa } = inputs;
    const surfaceArea = Number(area);
    const thicknessM = Number(espesor) / 100;
    const volume = surfaceArea * thicknessM;
    const results: MaterialResult[] = [];

    if (tipoCapa === 'contrapiso') {
        results.push({ name: 'Cemento', unit: 'bolsas (50kg)', quantity: volume * 3 });
        results.push({ name: 'Arena', unit: 'm³', quantity: volume * 0.7 });
        results.push({ name: 'Cascote', unit: 'm³', quantity: volume * 0.8 });
        results.push({ name: 'Film de Polietileno (200 micrones)', unit: 'm²', quantity: surfaceArea * 1.1 });
    } else { // Carpeta
        results.push({ name: 'Cemento', unit: 'bolsas (50kg)', quantity: volume * 8 });
        results.push({ name: 'Arena', unit: 'm³', quantity: volume * 1.05 });
    }
    return results;
};

const calculateAislaciones = (inputs: CalculationInput): MaterialResult[] => {
    const { area, tipoAislacion } = inputs;
    const surfaceArea = Number(area);
    const results: MaterialResult[] = [];

    switch(tipoAislacion) {
        case 'capaHorizontal':
            const mortarVolume = surfaceArea * 0.02; // 2cm espesor
            results.push({ name: 'Cemento', unit: 'bolsas (50kg)', quantity: mortarVolume * 8 }); // Mortero 1:3
            results.push({ name: 'Arena', unit: 'm³', quantity: mortarVolume * 1.05 });
            results.push({ name: 'Emulsión Asfáltica', unit: 'litros', quantity: surfaceArea * 0.5 });
            break;
        case 'membranaLiquida':
            results.push({ name: 'Membrana Líquida Fibrada', unit: 'litros', quantity: surfaceArea * 1.5 }); // 1.5 L/m2 en total
            break;
        case 'membranaAluminio':
            results.push({ name: 'Membrana Asfáltica con Aluminio (4mm)', unit: 'rollos (10m²)', quantity: (surfaceArea / 10) * 1.1 }); // 10% desperdicio
            results.push({ name: 'Imprimación Asfáltica', unit: 'litros', quantity: surfaceArea * 0.3 });
            break;
    }
    return results;
};

const calculateRevestimientos = (inputs: CalculationInput): MaterialResult[] => {
    const { area, perimetro, tipoRevestimiento } = inputs;
    const surfaceArea = Number(area);
    const results: MaterialResult[] = [];
    
    results.push({ name: 'Cerámicos / Porcelanato', unit: 'm²', quantity: surfaceArea });
    
    const adhesiveRates = { llana6: 4, llana10: 6 };
    const adhesiveRate = adhesiveRates[tipoRevestimiento as keyof typeof adhesiveRates];
    const adhesiveKg = surfaceArea * adhesiveRate;
    results.push({ name: 'Adhesivo para revestimiento', unit: 'bolsas (30kg)', quantity: adhesiveKg / 30 });
    results.push({ name: 'Pastina para juntas', unit: 'cajas (1kg)', quantity: surfaceArea * 0.3 });

    if(perimetro && Number(perimetro) > 0) {
        const perimeter = Number(perimetro);
        results.push({ name: 'Zócalos', unit: 'ml', quantity: perimeter });
        results.push({ name: 'Adhesivo para zócalos', unit: 'kg', quantity: perimeter * 0.5 }); // Aprox 0.5kg/ml
    }

    return results;
};

const calculateCielorrasos = (inputs: CalculationInput): MaterialResult[] => {
    const { area, tipoPlaca } = inputs;
    const surfaceArea = Number(area);
    const results: MaterialResult[] = [];
    
    results.push({ name: `Placa de Yeso (${tipoPlaca}) 1.2x2.4m`, unit: 'unidades', quantity: surfaceArea * 0.38 }); // 1 / (1.2*2.4) * 1.1
    results.push({ name: 'Perfil Solera 35mm', unit: 'tiras (2.6m)', quantity: (surfaceArea * 0.8) / 2.6 });
    results.push({ name: 'Perfil Montante 34mm', unit: 'tiras (2.6m)', quantity: (surfaceArea * 2.5) / 2.6 });
    results.push({ name: 'Tornillos T1 (punta aguja)', unit: 'unidades', quantity: surfaceArea * 2 });
    results.push({ name: 'Tornillos T2 (punta aguja)', unit: 'unidades', quantity: surfaceArea * 15 });
    results.push({ name: 'Fijaciones y Tacos del 8', unit: 'unidades', quantity: surfaceArea * 2 });
    results.push({ name: 'Cinta de Papel para Juntas', unit: 'rollos (75ml)', quantity: surfaceArea * 1.5 / 75 });
    results.push({ name: 'Masilla para Juntas', unit: 'kg', quantity: surfaceArea * 0.9 });
    
    return results;
};

const calculatePintura = (inputs: CalculationInput): MaterialResult[] => {
    const { area, manos, tipoPintura } = inputs;
    const surfaceArea = Number(area);
    const numCoats = Number(manos);
    const results: MaterialResult[] = [];

    if (tipoPintura === 'revestimientoTexturado') {
        const totalKg = surfaceArea * 1.2; // 1.2 kg/m² para textura media
        results.push({ name: 'Revestimiento Texturado', unit: 'baldes (30kg)', quantity: totalKg / 30 });
        results.push({ name: 'Base para Revestimiento', unit: 'litros', quantity: surfaceArea / 6 }); // Rinde 6m²/L
    } else {
        const yields = { latexInterior: 10, latexExterior: 8 };
        const yieldRate = yields[tipoPintura as keyof typeof yields];
        const totalPaintLiters = (surfaceArea * numCoats) / yieldRate;
        results.push({ name: `Pintura ${tipoPintura}`, unit: 'litros', quantity: totalPaintLiters });
        results.push({ name: 'Fijador Sellador', unit: 'litros', quantity: surfaceArea / 10 });
    }
    
    return results;
};


export const calculateMaterials = (category: Category, inputs: CalculationInput): MaterialResult[] => {
  switch (category) {
    case Category.MAMPOSTERIA:
      return calculateMamposteria(inputs);
    case Category.REVOQUES:
        return calculateRevoques(inputs);
    case Category.HORMIGON_HIERRO:
        return calculateHormigonYHierro(inputs);
    case Category.LOSAS:
        return calculateLosas(inputs);
    case Category.ENCADENADOS:
        return calculateEncadenados(inputs);
    case Category.CONTRAPISOS_CARPETAS:
        return calculateContrapisosCarpetas(inputs);
    case Category.AISLACIONES:
        return calculateAislaciones(inputs);
    case Category.REVESTIMIENTOS:
        return calculateRevestimientos(inputs);
    case Category.CIELORRASOS:
        return calculateCielorrasos(inputs);
    case Category.PINTURA:
        return calculatePintura(inputs);
    default:
      return [];
  }
};