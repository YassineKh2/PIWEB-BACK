import sys
import os
import face_recognition
import numpy as np
import json
import requests

def load_local_image(image_path):
    """Load an image directly from a local file path."""
    try:
        return face_recognition.load_image_file(image_path)
    except Exception as e:
        return {"success": False, "error": f"Error loading image from {image_path}: {str(e)}"}

def list_image_files(directory):
    """List full path of all image files in the given directory."""
    supported_extensions = ['.jpg', '.jpeg', '.png']
    return [os.path.join(directory, f) for f in os.listdir(directory)
            if os.path.splitext(f)[1].lower() in supported_extensions]

def compare_face_with_database(uploaded_image_path, image_files):
    uploaded_image = load_local_image(uploaded_image_path)
    if "success" in uploaded_image and not uploaded_image['success']:
        return uploaded_image

    try:
        uploaded_face_encodings = face_recognition.face_encodings(uploaded_image)
        if not uploaded_face_encodings:
            return {"success": False, "error": "No faces found in the uploaded image."}

        reference_encoding = uploaded_face_encodings[0]
        threshold = 0.6

        for image_file in image_files:
            user_image = load_local_image(image_file)
            if "success" in user_image and not user_image['success']:
                continue

            user_face_encodings = face_recognition.face_encodings(user_image)
            if user_face_encodings:
                distance = np.linalg.norm(reference_encoding - user_face_encodings[0])
                if distance < threshold:
                    filename = os.path.basename(image_file)
                    response = requests.get(f"http://localhost:3000/user/findUserByImage/{filename}")
                    if response.status_code == 200:
                        user_id = response.json().get("userId")
                        login_response = requests.post("http://localhost:3000/user/imglogin", json={"userId": user_id})
                        if login_response.status_code == 200:
                            return {
                                "success": True,
                                "match": True,
                                "filename": filename,
                                "fullPath": image_file,
                                "distance": distance,
                                "userId": user_id,
                                "login_response": login_response.json()
                            }

        return {"success": True, "match": False}
    except Exception as e:
        return {"success": False, "error": f"An error occurred: {str(e)}"}

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print(json.dumps({"success": False, "error": "Image path not provided"}))
        sys.exit(1)

    uploaded_image_path = sys.argv[1]
    images_directory = 'C:\\Users\\yassine\\Desktop\\9raya\\PI TWIN - Tournova\\PIWEB-BACK\\public\\images\\image'
    image_files = list_image_files(images_directory)

    result = compare_face_with_database(uploaded_image_path, image_files)
    print(json.dumps(result))
