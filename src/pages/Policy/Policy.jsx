import React from "react";
import "./policy.css";
import { Button } from "antd";
import { BiHomeCircle } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const Policy = () => {
    const navigator = useNavigate();
    return (
        <div className="policy__wrapper">
            <Button className="back__btn" onClick={() => navigator(-1)}>
                <BiHomeCircle />
            </Button>
            <h1>Chính sách & Bảo hành</h1>
            <h4>ĐỂ ĐẢM BẢO QUYỀN LỢI CỦA KHÁCH HÀNG & UY TÍN CỦA CÔNG TY</h4>
            <ul className="policy__list">
                <li className="policy__item">
                    - Đề nghị Quý khách kiểm tra hàng hóa và tiền trước khi ra
                    khỏi quầy. Sau khi Quý khách ra khỏi quầy, Công ty sẽ không
                    chịu trách nhiệm giải quyết mọi khiếu nại hoặc sai thiếu.
                </li>
                <li className="policy__item">
                    - Đề nghị Quý khách giữ Hóa đơn bán hàng kiêm Giấy đảm bảo
                    và Giấy kiểm định sản phẩm để phục vụ cho việc trao đổi, bảo
                    hành sản phẩm. Nếu không có Hóa đơn bán hàng kiêm Giấy đảm
                    bảo và Giấy kiểm định sản phẩm, Công ty sẽ không áp dụng chế
                    độ ưu đãi theo quy chế hiện hành hoặc có thể từ chối trao
                    đổi mua bán.
                </li>
                <li className="policy__item">
                    - Khi bán lại hàng, Quý khách chịu mọi chi phí kiểm định
                    chất lượng. Khi tháo viên ra khỏi ổ có sự chứng kiến của
                    khách hàng.
                </li>
                <li className="policy__item">
                    - Đề nghị Quý khách kiểm tra hàng hóa, giữ Hóa đơn kiêm Giấy
                    đảm bảo và Giấy kiểm định sản phẩm. Trường hợp Quý khách mất
                    Hóa đơn kiêm Giấy đảm bảo hoặc Giấy kiểm định sản phẩm hoặc
                    sản phẩm không còn nguyên vẹn, Công ty sẽ mua lại theo thỏa
                    thuận hoặc có quyền từ chối không mua lại.
                </li>
            </ul>
            <table className="table___Wrapper">
                <caption>
                    <strong>1. CHÍNH SÁCH BẢO HÀNH</strong>
                </caption>
                <thead>
                    <tr>
                        <th className="th__warapper">CHỦNG LOẠI</th>
                        <th className="th__warapper">CHI TIẾT</th>
                        <th className="th__warapper">LƯU Ý</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="td__warapper section-title" colSpan="3">
                            I. Trang sức vàng tây
                        </td>
                    </tr>
                    <tr>
                        <td className="td__warapper">1. Nhẫn cưới</td>
                        <td className="td__warapper">
                            - Đảm bảo về chất lượng tuổi vàng ghi trên Hóa đơn
                            bán hàng kèm Giấy đảm bảo.
                            <br />
                            - Miễn phí siêu âm, đánh bóng, xi trọn đời sản phẩm.
                            <br />
                            - Miễn phí khắc tên, họa tiết trên sản phẩm.
                            <br />- Miễn phí điều chỉnh size nhẫn. Khách hàng
                            trả phí trong trường hợp sửa size có bù thêm vàng,
                            tính theo giá tuổi vàng niêm yết của sản phẩm tại
                            thời điểm thanh toán.
                        </td>
                        <td className="td__warapper">
                            - Không áp dụng bảo hành cho các sản phẩm bị đứt
                            gãy, bị biến dạng hoặc hư hỏng nặng.
                            <br />- Không thực hiện dịch vụ sửa chữa, xi mạ đối
                            với sản phẩm bạc.
                        </td>
                    </tr>
                    <tr>
                        <td className="td__warapper">2. Trang sức khác</td>
                        <td className="td__warapper">
                            - Đảm bảo về chất lượng tuổi vàng ghi trên Hóa đơn
                            bán hàng kèm Giấy đảm bảo.
                            <br />
                            - Tân trang, đánh bóng làm mới sản phẩm vĩnh viễn,
                            miễn phí xi mạ lần đầu. Áp dụng thu phí xi mạ với
                            lần thứ hai theo giá Công ty quy định tại thời điểm
                            thanh toán.
                            <br />
                            - Miễn phí dịch vụ sửa size, khắc chữ lắp đá, vào
                            viên.
                            <br />- Trường hợp khách hàng chỉ mua ổ (hoặc viên)
                            và đem viên hoặc ổ từ ngoài vào, miễn phí lắp đá,
                            vào viên cho khách.
                        </td>
                        <td className="td__warapper"></td>
                    </tr>
                    <tr>
                        <td colSpan="3" className="section-title td__warapper">
                            II. Trang sức vàng 24k
                        </td>
                    </tr>
                    <tr>
                        <td className="td__warapper" colSpan="2">
                            - Đảm bảo về chất lượng tuổi vàng: Tất cả các sản
                            phẩm của Công ty bán ra được đảm bảo về chất lượng
                            tuổi vàng ghi trên Hóa đơn bán hàng kèm Giấy đảm
                            bảo.
                            <br />
                            - Tân trang làm sạch sản phẩm bằng vàng miễn phí lần
                            đầu.
                            <br />
                            - Bảo hành miễn phí, sửa chữa sản phẩm bị lỗi do kỹ
                            thuật sản xuất.
                            <br />
                            - Lưu ý cách bảo quản trang sức vàng 24K:
                            <br />
                            + Nên bảo quản các loại trang sức trong những ngăn
                            hộp hoặc túi riêng biệt, tránh va chạm lẫn nhau gây
                            trầy xước.
                            <br />
                            + Tránh để trang sức tiếp xúc trực tiếp với các hóa
                            chất có tính chất tẩy mạnh, có thể dẫn đến ngả màu.
                            <br />+ Để trang sức luôn sáng đẹp, dùng khăn cotton
                            để lau nhẹ bề mặt trang sức. Tuyệt đối không sử dụng
                            những vật bằng kim loại cứng hoặc có cạnh sắc nhọn.
                        </td>
                        <td className="td__warapper">
                            - Không bảo hành phần đá gắn trên sản phẩm (nếu có).
                            <br />- Sản phẩm có chất làm đầy bằng chất liệu khác
                            bên trong Công ty không bảo hành.
                        </td>
                    </tr>
                </tbody>
            </table>
            <table className="table___Wrapper">
                <caption>
                    <strong>2. CHÍNH SÁCH THU ĐỔI</strong>
                </caption>
                <tr>
                    <th className="th__warapper" rowspan="2">
                        CHỦNG LOẠI
                    </th>
                    <th className="th__warapper" colspan="2">
                        BÁN LẠI
                    </th>
                    <th className="th__warapper" rowspan="2">
                        ĐỔI HÀNG
                    </th>
                </tr>
                <tr>
                    <th className="th__warapper" colspan="2">
                        %
                    </th>
                </tr>
                <tr>
                    <td className="td__warapper" rowspan="5">
                        I. Kim cương viên
                        <br />
                        1. Kim cương trắng, cắt dạng tròn
                    </td>
                    <td className="td__warapper">Kích thước trên 10.0 ly</td>
                    <td className="td__warapper">Theo thỏa thuận</td>
                    <td className="td__warapper">Theo thỏa thuận</td>
                </tr>
                <tr>
                    <td className="td__warapper">
                        Kích thước trên 8.6 ly đến 10.0 ly
                    </td>
                    <td className="td__warapper">93%</td>
                    <td className="td__warapper">93%</td>
                </tr>
                <tr>
                    <td className="td__warapper">
                        Kích thước từ 6.0 ly đến 8.6 ly
                    </td>
                    <td className="td__warapper">95%</td>
                    <td className="td__warapper">98%</td>
                </tr>
                <tr>
                    <td className="td__warapper">
                        Kích thước từ 5.0 ly đến dưới 6.0 ly
                    </td>
                    <td className="td__warapper">93%</td>
                    <td className="td__warapper">97%</td>
                </tr>
                <tr>
                    <td className="td__warapper">Kích thước dưới 5.0 ly</td>
                    <td className="td__warapper">93%</td>
                    <td className="td__warapper">95%</td>
                </tr>
                <tr>
                    <td className="td__warapper" rowspan="2">
                        2. Kim cương màu
                    </td>
                    <td className="td__warapper" colspan="2">
                        80%
                    </td>
                    <td className="td__warapper">90%</td>
                </tr>
                <tr>
                    <td className="td__warapper" colspan="2">
                        80%
                    </td>
                    <td className="td__warapper">90%</td>
                </tr>
                <tr>
                    <td className="td__warapper">
                        3. Kim cương trắng (không phải cắt dạng tròn)
                    </td>
                    <td className="td__warapper" colspan="2">
                        80%
                    </td>
                    <td className="td__warapper">90%</td>
                </tr>
                <tr>
                    <td className="td__warapper" rowspan="6">
                        II. Trang sức vàng tây
                    </td>
                    <td className="td__warapper">
                        1. Trang sức kim cương gắn sẵn
                    </td>
                    <td className="td__warapper">80%</td>
                    <td className="td__warapper">90%</td>
                </tr>
                <tr>
                    <td className="td__warapper">2. Trang sức ổ kim cương</td>
                    <td className="td__warapper">80%</td>
                    <td className="td__warapper">85%</td>
                </tr>
                <tr>
                    <td className="td__warapper">
                        3. Trang sức nhẫn đính hôn kim cương
                    </td>
                    <td className="td__warapper">70%</td>
                    <td className="td__warapper">80%</td>
                </tr>
                <tr>
                    <td className="td__warapper">4. Trang sức đá màu</td>
                    <td className="td__warapper">70%</td>
                    <td className="td__warapper">80%</td>
                </tr>
                <tr>
                    <td className="td__warapper">5. Trang sức nhẫn cưới</td>
                    <td className="td__warapper">70%</td>
                    <td className="td__warapper">80%</td>
                </tr>
                <tr>
                    <td className="td__warapper">6. Trang sức gắn đá CZ</td>
                    <td className="td__warapper">70%</td>
                    <td className="td__warapper">80%</td>
                </tr>
                <tr>
                    <td className="td__warapper" colspan="6">
                        III. Trang sức Vàng 24K
                    </td>
                </tr>
                <tr>
                    <td className="td__warapper">
                        1. Đối với sản phẩm GEM bán ra
                    </td>
                    <td className="td__warapper" style={{ lineHeight: "25px" }}>
                        - Thực hiện mua lại các sản phẩm bằng vàng bao gồm: sản
                        phẩm vàng nguyên khối, logo, huy hiệu, trang sức
                        <br />
                        - C Công ty bán trang sức ra tuổi nào, sẽ nhận lại nữ
                        trang hồi theo tuổi đó
                        <br />
                        - Mua lại theo trọng lượng vàng thực tế và tính theo giá
                        niêm yết tại thời điểm giao dịch.
                        <br />
                        - Không tính tiền công chế tác và đá gắn trên sản phẩm
                        hàng bán lại (nếu có).
                        <br />
                        - Đối với sản phẩm có hóa đơn và trên sản phẩm có đầy đủ
                        dấu hiệu quy định: Tính theo giá mua lại nữ trang niêm
                        yết tại thời điểm giao dịch.
                        <br />
                        - Đối với sản phẩm không có hóa đơn: Khi khách bán lại,
                        sản phẩm thể hiện rõ dấu hiệu, ấn chỉ... của DOJI, được
                        mua lại theo giá nữ trang niêm yết tại thời điểm giao
                        dịch
                        <br />
                        + Nếu không xác định lại được rõ ràng dấu hiệu của Công
                        ty, để khách hàng thử lại tuổi vàng tại DOJILAB, sau đó
                        mua lại theo tuổi vàng thực tế.
                        <br />
                        + Trường hợp kết quả thử tuổi đúng với tuổi vàng quy
                        định: được tính mua lại theo giá niêm yết tại thời điểm
                        giao dịch.
                        <br />
                        + Trường hợp kết quả thử tuổi chênh lệch so với tuổi
                        vàng quy định: được quy về tuổi chuẩn để mua lại theo
                        giá nguyên liệu tại thời điểm giao dịch.
                        <br />
                        - Công ty thực hiện mua lại ở những điểm có máy thử tuổi
                        của DOJILAB, nếu sản phẩm khách bán là:
                        <br />+ Đối với Trang sức vàng 24K hoặc nguyên liệu thô:
                        phải được nấu chảy thành nguyên liệu thô để thử tuổi{" "}
                        <br />+ Đối với hàng Phi SJC ép vỉ các loại: không cần
                        nấu chảy nhưng vẫn phải được kiểm chuẩn lại chất lượng
                        (áp dụng theo thông báo hiện hành).
                        <br />+ Được áp dụng mua lại theo quy chế hiện hành của
                        DOJI
                    </td>
                    <td
                        className="td__warapper"
                        style={{ lineHeight: "25px" }}
                        colSpan={3}
                    >
                        - Đối với trường hợp đổi cùng tuổi vàng:
                        <br />
                        + Được tính đổi sang ngang cùng trọng lượng.
                        <br />
                        + Giá đổi hàng được tính theo giá bán nữ trang tại thời
                        điểm giao dịch.
                        <br />
                        + Phần vàng chênh lệch của nữ trang mới và nguyên liệu
                        cũ (sản phẩm cũ) được tính theo giá bán ra và mua vào
                        tại thời điểm giao dịch.
                        <br />
                        - Đối với trường hợp đổi khác tuổi vàng:
                        <br />
                        + Nguyên liệu dùng để đổi nữ trang mới bao gồm: Trang
                        sức của GEM.
                        <br />
                        + Thực hiện tính theo giá niêm yết mua vào, bán ra tại
                        thời điểm giao dịch.
                        <br />+ Đối với sản phẩm trang sức mới: tính theo giá
                        bán ra niêm yết tại thời điểm giao dịch, khách trả thêm
                        tiền công sản phẩm mới.
                        <br />+ Đối với nguyên liệu cũ (sản phẩm cũ): Tính theo
                        giá mua vào của trang sức có cùng tuổi vàng niêm yết tại
                        thời điểm giao dịch.
                        <br />- Quy định thử tuổi
                        <br />+ Nguyên liệu dùng để đổi hàng phải được thử tuổi
                        qua máy của Viện ngọc học DOJILAB.
                        <br />+ Không áp dụng thu phí thử tuổi khi khách hàng có
                        giao dịch đổi trang sức mới của Công ty.
                        <br />+ Khách hàng vẫn phải trả phí thử tuổi theo quy
                        định khi không có giao dịch mua đổi hàng của Công ty
                    </td>
                </tr>
                <tr>
                    <td className="td__warapper">
                        2. Đối với sản phẩm không phải của GEM bán ra
                    </td>
                    <td className="td__warapper" style={{ lineHeight: "25px" }}>
                        - Công ty thực hiện mua lại ở những điểm có máy thử tuổi
                        của DOJILAB, nếu sản phẩm khách bán là:
                        <br />+ Đối với Trang sức vàng 24K hoặc nguyên liệu thô:
                        phải được nấu chảy thành nguyên liệu thô để thử tuổi.
                        <br />+ Đối với hàng Phi SJC ép vỉ các loại: không cần
                        nấu chảy nhưng vẫn phải được kiểm chuẩn lại chất lượng
                        (áp dụng theo thông báo hiện hành).
                    </td>
                    <td className="td__warapper" colSpan={2}></td>
                </tr>
            </table>
            <h3>Lưu ý:</h3>
            <ul className="policy__list">
                <li className="policy__item" style={{ marginLeft: "4px" }}>
                    - Đối với trang sức vàng tây & kim cương viên: Quy chế này
                    bắt đầu áp dụng mua từ thời điểm từ ngày 01/07/2024 trở đi.
                </li>
                <li className="policy__item" style={{ marginLeft: "4px" }}>
                    - Đối với hàng trang sức cao cấp & kim cương viên mua trước
                    thời điểm ngày 01/07/2024 sẽ được áp dụng theo quy chế ban
                    hành tại thời điểm đó.
                </li>
            </ul>{" "}
            <h3>Chính sách khác</h3>
            <ul>
                <li style={{ marginLeft: "4px", marginBottom: "4px" }}>
                    Vệ sinh miễn phí.
                </li>
                <li style={{ marginLeft: "4px", marginBottom: "4px" }}>
                    Khử từ miễn phí.
                </li>{" "}
                <li style={{ marginLeft: "4px", marginBottom: "4px" }}>
                    Dịch vụ sửa chữa và bảo hành theo tiêu chuẩn Thụy Sỹ
                </li>
            </ul>
        </div>
    );
};

export default Policy;
