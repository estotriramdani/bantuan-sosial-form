export interface IProvince {
  id: string;
  name: string;
}

export interface IRegency {
	id: string;
	province_id: string;
	name: string;
}

export interface IDistrict {
	id: string;
	regency_id: string;
	name: string;
}

export interface IVillage {
	id: string;
	district_id: string;
	name: string;
}