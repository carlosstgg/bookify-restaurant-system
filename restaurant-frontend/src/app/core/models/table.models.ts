export interface Table {
    table_id: number;
    table_number: number;
    capacity: number;
    // We might add isOccupied or currentOrder later, but for now basic schema
    // The backend doesn't seem to persist 'isOccupied' in the Table model, 
    // it likely derives it from active orders. 
    // For now, let's keep it simple.
  }
