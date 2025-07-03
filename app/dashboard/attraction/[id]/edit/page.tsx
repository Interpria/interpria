import EditAttractionForm from './EditAttractionForm';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const attractionId = parseInt(id, 10);

  return (
    <EditAttractionForm
      attractionId={attractionId}
    />
  );
}