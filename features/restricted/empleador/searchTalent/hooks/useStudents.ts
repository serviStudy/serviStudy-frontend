"use client";

import { useState, useEffect, useCallback } from "react";
import { PaginatedStudents } from "../types/searchTalent.types";
import { getStudents } from "../services/searchTalent.service";

export const useStudents = (initialPage: number = 0, size: number = 10, search: string = "") => {
  const [data, setData] = useState<PaginatedStudents | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(initialPage);

  const fetchStudents = useCallback(async (pageNumber: number, searchQuery: string) => {
    try {
      setLoading(true);
      setError(null);
      const res = await getStudents(pageNumber, size, searchQuery);
      setData(res);
      setPage(pageNumber);
    } catch (err: any) {
      setError(err.message || "Ocurrió un error al cargar los estudiantes.");
    } finally {
      setLoading(false);
    }
  }, [size]);

  useEffect(() => {
    setPage(0);
  }, [search]);

  useEffect(() => {
    fetchStudents(page, search);
  }, [fetchStudents, page, search]);

  return {
    data,
    loading,
    error,
    page,
    setPage,
    refresh: () => fetchStudents(page, search),
  };
};
