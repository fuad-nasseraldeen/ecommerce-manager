export default function Modal({ deleteIndex, setDeleteIndex, showDeleteModal, setShowDeleteModal, handleDelete }) {
  return (
    <>
      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4'>
          <div className='w-full max-w-sm rounded-xl border border-slate-200 bg-white p-4 shadow-2xl'>
            <p className='text-slate-900'>Are you sure you want to delete this image?</p>
            <div className='mt-4 flex justify-end gap-2'>
              <button onClick={() => handleDelete(deleteIndex)} className='btn-primary mr-2'>
                Yes
              </button>
              <button onClick={() => setShowDeleteModal(false)} className='btn-default '>
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
