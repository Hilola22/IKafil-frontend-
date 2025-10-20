"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

interface DevicePaginationProps {
  page: number;
  totalPages: number;
}

export function DevicePagination({ page, totalPages }: DevicePaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const setPage = (targetPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", targetPage.toString());
    router.push(`?${params.toString()}`);
  };

  return (
    <Pagination>
      <PaginationContent>
        {page > 1 && (
          <PaginationItem>
            <Link
              href={`?page=${page - 1}`}
              onClick={(e) => {
                e.preventDefault();
                setPage(page - 1);
              }}
              className="px-3 py-1 rounded-md border shadow-sm hover:bg-gray-100 transition text-lg"
            >
              ‹
            </Link>
          </PaginationItem>
        )}

        {page > 2 && (
          <PaginationItem>
            <PaginationLink
              href={`?page=1`}
              onClick={(e) => {
                e.preventDefault();
                setPage(1);
              }}
            >
              1
            </PaginationLink>
          </PaginationItem>
        )}

        {page > 3 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationLink
            href={`?page=${page}`}
            isActive
            onClick={(e) => {
              e.preventDefault();
              setPage(page);
            }}
          >
            {page}
          </PaginationLink>
        </PaginationItem>

        {page < totalPages - 2 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {page < totalPages - 1 && (
          <PaginationItem>
            <PaginationLink
              href={`?page=${totalPages}`}
              onClick={(e) => {
                e.preventDefault();
                setPage(totalPages);
              }}
            >
              {totalPages}
            </PaginationLink>
          </PaginationItem>
        )}

        {page < totalPages && (
          <PaginationItem>
            <Link
              href={`?page=${page + 1}`}
              onClick={(e) => {
                e.preventDefault();
                setPage(page + 1);
              }}
              className="px-3 py-1 rounded-md border shadow-sm hover:bg-gray-100 transition text-lg"
            >
              ›
            </Link>
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
