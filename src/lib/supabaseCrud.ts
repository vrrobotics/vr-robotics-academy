import { supabase } from "./supabase";

interface BaseRecord {
  _id: string;
  _createdDate?: string;
  _updatedDate?: string;
}

export class SupabaseCrudService {
  /**
   * Creates a new record in the specified Supabase table.
   * @param tableName The name of the table.
   * @param record The record data to insert.
   * @returns The created record.
   */
  static async create<T extends BaseRecord>(tableName: string, record: Partial<T>): Promise<T> {
    try {
      // Handle when Supabase is not configured (GitHub Pages static deployment)
      if (!supabase) {
        console.warn(`[SupabaseCrudService] Supabase not initialized - creating mock record for ${tableName}`);
        return { ...record, _id: record._id || crypto.randomUUID() } as T;
      }

      const dataToInsert: any = { ...record };
      
      // Handle both naming conventions for timestamps
      const now = new Date().toISOString();
      if (!dataToInsert.created_at && !dataToInsert._createdDate) {
        dataToInsert.created_at = now;
      }
      if (!dataToInsert.updated_at && !dataToInsert._updatedDate) {
        dataToInsert.updated_at = now;
      }

      console.log(`[SupabaseCrudService] Inserting into ${tableName}:`, dataToInsert);
      
      const { data, error } = await supabase
        .from(tableName)
        .insert([dataToInsert])
        .select();

      if (error) {
        // If it's a connection/fetch error and Supabase is on GitHub Pages, handle gracefully
        const errorMsg = `Supabase Error [${error.code}]: ${error.message}`;
        console.warn(`[SupabaseCrudService] Could not create record in ${tableName}: ${errorMsg}`);
        console.warn('[SupabaseCrudService] Continuing without database persistence (GitHub Pages static deployment)');
        
        // Return mock record so the form submission can continue with email/Google Sheets
        return { ...record, _id: record._id || crypto.randomUUID() } as T;
      }
      console.log(`[SupabaseCrudService] ✓ Successfully created record in ${tableName}:`, data[0]);
      return data[0] as T;
    } catch (err: any) {
      // Handle network/fetch errors gracefully
      if (err instanceof TypeError && err.message.includes('Failed to fetch')) {
        console.warn(`[SupabaseCrudService] Network error - Supabase unavailable for ${tableName}`);
        console.warn('[SupabaseCrudService] Continuing without database persistence');
        // Return mock record with the provided data
        const mockRecord = { ...record, _id: record._id || crypto.randomUUID() } as T;
        return mockRecord;
      }
      
      console.error(`[SupabaseCrudService] Error in create operation for ${tableName}:`, err);
      throw err;
    }
  }

  /**
   * Retrieves all records from the specified Supabase table.
   * @param tableName The name of the table.
   * @returns An object containing the items (records) from the table.
   */
  static async getAll<T>(tableName: string): Promise<{ items: T[] }> {
    try {
      // Handle when Supabase is not configured (GitHub Pages static deployment)
      if (!supabase) {
        console.warn(`[SupabaseCrudService] Supabase not initialized - returning empty items for ${tableName}`);
        return { items: [] };
      }

      const { data, error } = await supabase
        .from(tableName)
        .select("*");

      if (error) {
        console.warn(`[SupabaseCrudService] Warning: Could not fetch from ${tableName}: ${error.message}`);
        return { items: [] };
      }
      return { items: data as T[] };
    } catch (err) {
      console.warn(`[SupabaseCrudService] Warning: Fetch operation failed for ${tableName}:`, err);
      return { items: [] };
    }
  }

  /**
   * Retrieves a single record by its ID from the specified Supabase table.
   * @param tableName The name of the table.
   * @param id The ID of the record to retrieve.
   * @returns The record if found, otherwise null.
   */
  static async getById<T extends BaseRecord>(tableName: string, id: string): Promise<T | null> {
    const { data, error } = await supabase
      .from(tableName)
      .select("*")
      .eq("_id", id)
      .single();

    if (error && error.code === "PGRST116") { // PGRST116 means no rows found for single() query
      return null;
    } else if (error) {
      throw new Error(`Error fetching record by ID from ${tableName}: ${error.message}`);
    }
    return data as T;
  }

  /**
   * Updates an existing record in the specified Supabase table.
   * Assumes the record has an _id field for identification.
   * @param tableName The name of the table.
   * @param record The record data to update.
   * @returns The updated record.
   */
  static async update<T extends BaseRecord>(tableName: string, record: Partial<T>): Promise<T> {
    if (!record._id) {
      throw new Error("Record must have an _id for updating.");
    }
    const { data, error } = await supabase
      .from(tableName)
      .update({
        ...record,
        _updatedDate: new Date().toISOString(),
      })
      .eq("_id", record._id)
      .select();

    if (error) {
      throw new Error(`Error updating record in ${tableName}: ${error.message}`);
    }
    return data[0] as T;
  }

  /**
   * Deletes a record from the specified Supabase table by its ID.
   * @param tableName The name of the table.
   * @param id The ID of the record to delete.
   */
  static async delete(tableName: string, id: string): Promise<void> {
    const { error } = await supabase
      .from(tableName)
      .delete()
      .eq("_id", id);

    if (error) {
      throw new Error(`Error deleting record from ${tableName}: ${error.message}`);
    }
  }
}
