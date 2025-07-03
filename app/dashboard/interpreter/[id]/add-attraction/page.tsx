import AddAttractionToInterpreterForm from './AddAttractionToInterpreterForm';

export default async function AddAttractionPage({ params }: { params: Promise<{ id: string }>}) {
  const { id } = await params;
  const interpreterId = parseInt(id);

  return (
    <AddAttractionToInterpreterForm interpreterId={interpreterId} />
  );
} 