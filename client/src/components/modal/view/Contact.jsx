import moment from "moment"
import ButtonClose from "../../elements/ButtonClose"

const Contact = ({data, handleHiddenModal}) => {
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
                            <th>Nama</th>
                            <td className="break-words">{data.name}</td>
                        </tr>
                        <tr>
                            <th>Institusi</th>
                            <td className="break-words">{data.institution}</td>
                        </tr>
                        <tr>
                            <th>Email</th>
                            <td className="break-words">{data.email}</td>
                        </tr>
                        <tr>
                            <th>Kota/Negara</th>
                            <td className="break-words">{data.city}</td>
                        </tr>
                        <tr>
                            <th>Nomor Telephone</th>
                            <td className="break-words">{data.telephone}</td>
                        </tr>
                        <tr>
                            <th>Jabatan</th>
                            <td className="break-words">{data.position}</td>
                        </tr>
                        <tr>
                            <th>Klasifikasi</th>
                            <td className="break-words">{data.classification}</td>
                        </tr>
                        <tr>
                            <th>Waktu diupload</th>
                            <td className="break-words">{moment(data.createdAt).format('dddd, D MMMM YYYY')}</td>
                        </tr>
                        <tr>
                            <th>Waktu diubah</th>
                            <td className="break-words">{moment(data.updatedAt).fromNow()}</td>
                        </tr>
                        <tr>
                            <th>Created User</th>
                            <td className="break-words">{data.createdUser}</td>
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

export default Contact