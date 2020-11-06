/* 이미지 업로드 */
exports.uploadImage = async (req, res) => {
  try {
    if (true) {
      return res.status(200).json({
        success: true,
      });
    }
    return res.status(400).json({
      success: false,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error,
    });
  }
};
