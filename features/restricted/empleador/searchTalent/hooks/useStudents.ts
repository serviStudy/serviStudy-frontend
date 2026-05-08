"use client";

import { useState, useEffect, useCallback } from "react";
import { PaginatedStudents } from "../types/searchTalent.types";
import { getStudents } from "../services/searchTalent.service";

export const useStudents = (initialPage: number = 0, size: number = 10) => {
  const [data, setData] = useState<PaginatedStudents | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(initialPage);

  const fetchStudents = useCallback(async (pageNumber: number) => {
    try {
      setLoading(true);
      setError(null);
      const res = await getStudents(pageNumber, size);
      setData(res);
      setPage(pageNumber);
    } catch (err: any) {
      setError(err.message || "Ocurrió un error al cargar los estudiantes.");
    } finally {
      setLoading(false);
    }
  }, [size]);

  useEffect(() => {
    fetchStudents(page);
  }, [fetchStudents, page]);

  return {
    data,
    loading,
    error,
    page,
    setPage,
    refresh: () => fetchStudents(page),
  };
};
