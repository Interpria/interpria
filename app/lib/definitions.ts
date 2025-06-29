export type User = {
    user_id: number;
    email: string;
    name: string;
    password_hash: string;
    role: 'user' | 'attraction' | 'admin';
    phone: string;
    created_at: Date;
    updated_at: Date;
};
  
export type Interpreter = {
  interpreter_id: number;
  user_id: number;
  gender: 'male' | 'female' | 'other';
  bio: string;
  introduction: string;
  primary_language_id: number;
  rating: number|null;
  created_at: Date;
  updated_at: Date;
};

export type Language = {
  language_id: number;
  code: string | null;
  name: string;
  created_at: Date;
  updated_at: Date;
};

export type Attraction = {
  attraction_id: number;
  name: string;
  description: string;
  address: string;
  postal_code: string;
  city: string;
  province: string | null;
  country: string;
  email: string | null;
  phone: string | null;
  is_closed: number;
  website: string | null;
  category: 'museum' | 'art' | 'nature' | 'historical' | 'other';
  longitude: number;
  latitude: number;
  created_at: Date;
  updated_at: Date;
};

export type Interpreterxlanguage = {
  interpreterxlanguage_id: number;
  interpreter_id: number;
  language_id: number;
  created_at: Date;
  updated_at: Date;
};

export type Interpreterxattraction = {
  interpreterxattraction_id: number;
  interpreter_id: number;
  attraction_id: number;
  duration: number;
  buffer_time: number;
  max_traveler: number;
  price: number;
  created_at: Date;
  updated_at: Date;
  attraction_name: string;
};

export type AvailabilityAttraction = {
  availability_id: number;
  attraction_id: number;
  weekday: number;
  start_time: string;
  end_time: string;
  created_at: Date;
  updated_at: Date;
};

export type AvailabilityInterpreter = {
  availability_id: number;
  interpreter_id: number;
  attraction_id: number;
  weekday: number;
  date: Date;
  start_time: string;
  end_time: string;
  created_at: Date;
  updated_at: Date;
};

export type Booking = {
  booking_id: number;
  user_id: number;
  interpreter_id: number;
  attraction_id: number;
  start_time: string;
  end_time: string;
  language_id: number;
  num_people: number;
  price: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'rated';
  rating: number | null;
  created_at: Date;
  updated_at: Date;
};