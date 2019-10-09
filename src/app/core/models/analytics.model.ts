
export interface Analytics {
    headers: Header[];
    metaData: MetaData;
    rows: string[][];
    height: number;
    width: number;
}


export interface Header {
    name: string;
    column: string;
    valueType: string;
    type: string;
    hidden: boolean;
    meta: boolean;
}

export interface UVLU1Njotu4 {
    name: string;
}

export interface LVnpcptMtAD {
    name: string;
}

export interface Dx {
    name: string;
}

export interface Pe {
    name: string;
}

export interface Ou {
    name: string;
}

export interface M0frOspS7JY {
    name: string;
}

export interface YqA1CfsfBHQ {
    name: string;
}

export interface Items {
    2019: 20192;
    UVLU1Njotu4: UVLU1Njotu4;
    lVnpcptMtAD: LVnpcptMtAD;
    dx: Dx;
    pe: Pe;
    ou: Ou;
    m0frOspS7JY: M0frOspS7JY;
    yqA1CfsfBHQ: YqA1CfsfBHQ;
}

export interface Dimensions {
    dx: string[];
    pe: string[];
    ou: string[];
    co: string[];
}

export interface MetaData {
    items: Items;
    dimensions: Dimensions;
}

