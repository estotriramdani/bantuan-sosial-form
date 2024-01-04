import { Link } from 'react-router-dom';
import { buttonVariants } from '@/components/ui/button';
import useSubmissions from '@/hooks/useSubmissions';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { SubmissionParams } from '@/types';
import { useState } from 'react';
import DetailData from '@/components/DetailData';

const Submissions = () => {
  const submissions = useSubmissions();
  const [selectedData, setSelectedData] = useState<SubmissionParams>();

  const handleDetail = (data: SubmissionParams) => {
    setSelectedData(data);
  };

  return (
    <div className="p-6">
      <div className="mb-3">
        <Link to="/" className={buttonVariants({ variant: 'default', size: 'sm' })}>
          Tambah data
        </Link>
      </div>
      <Table>
        <TableCaption>Total data {submissions.length}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>No</TableHead>
            <TableHead>Nama</TableHead>
            <TableHead>Alamat</TableHead>
            <TableHead>Kabupaten</TableHead>
            <TableHead>Kecamatan</TableHead>
            <TableHead>Detail</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {submissions.map((submission, index) => (
            <TableRow key={submission.id || Math.random()}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{submission.nama}</TableCell>
              <TableCell>{submission.alamat}</TableCell>
              <TableCell>{submission.kabupaten}</TableCell>
              <TableCell>{submission.kecamatan}</TableCell>
              <TableCell>
                <DetailData handleDetail={handleDetail} selectedData={selectedData} submission={submission} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Submissions;
