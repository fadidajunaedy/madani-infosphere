import moment from "moment"
import { HiArrowDownTray, HiArrowTopRightOnSquare } from "react-icons/hi2"
import ButtonClose from "../../elements/ButtonClose"

const Report = ({data, handleHiddenModal}) => {
    return (
        <div className="modal sm:modal-middle modal-open">
            <div className="modal-box prose">
                <table className="table-fixed">
                    <thead>
                        <tr>
                            <td colSpan={2}>
                                <h3 className="text-2xl font-bold mb-4">Detail</h3>
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>Judul</th>
                            <td className="break-words">{data.title}</td>
                        </tr>
                        <tr>
                            <th>Deskripsi</th>
                            <td >
                                <p className="break-words">
                                    {data.description}
                                </p>
                            </td>
                        </tr>
                        <tr>
                            <th>Tags</th>
                            <td className="flex flex-wrap gap-2">
                                {data.tags && data.tags.map((tag, index) => (
                                <span key={index} className="bg-green-200 text-green-600 hover:bg-green-300 text-xs font-semibold py-1 px-2 rounded-lg">
                                    {tag}
                                </span>
                                ))}
                            </td>
                        </tr>
                        {data.relatedProgram !== "" && (
                        <tr>
                            <th>Program Terkait</th>
                            <td className="break-words">{data.relatedProgram}</td>
                        </tr>
                        )}
                        {data.file && (
                        <>
                        <tr>
                            <th>File</th>
                            <td className="break-words">{data.file}</td>
                            
                        </tr>
                        <tr>
                            <th>Download</th>
                            <td className="break-words">
                                <a
                                href={`https://api.madani-infosphere.id/download/${data.category}/${data.file}`}
                                className="btn btn-xs btn-secondary"
                                target="_blank"
                                rel="noreferrer">
                                    <HiArrowDownTray /> Download
                                </a>
                            </td>
                        </tr>
                        </>
                        )}
                        {data.linkFile && (
                        <tr>
                            <th>Link</th>
                            <td className="break-words">
                            <a
                                href={data.linkFile}
                                className="btn btn-xs btn-secondary"
                                target="_blank"
                                rel="noreferrer">
                                    <HiArrowTopRightOnSquare /> Go to Link
                                </a>
                            </td>
                        </tr>
                        )}
                        
                        {data.subcategory !== "peraturan-dan-regulasi" && (
                        <tr>
                            <th>Tahun</th>
                            <td className="break-words">{data.year}</td>
                        </tr>
                            )}
                        <tr>
                            <th>Diupload Oleh</th>
                            <td className="break-words">{data.createdUser}</td>
                        </tr>
                        <tr>
                            <th>Waktu diupload</th>
                            <td className="break-words">{moment(data.createdAt).format('dddd, D MMMM YYYY')}</td>
                        </tr>
                        <tr>
                            <th>Waktu diubah</th>
                            <td className="break-words">{moment(data.updatedAt).fromNow()}</td>
                        </tr>
                    </tbody>
                </table>
                <div className="modal-action">
                    <ButtonClose onClick={handleHiddenModal}>
                        Tutup
                    </ButtonClose>
                </div>
            </div>
        </div>
    )
}

export default Report