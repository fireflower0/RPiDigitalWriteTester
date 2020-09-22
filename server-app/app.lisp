(load "wiringpi-wrapper.lisp" :external-format :utf-8)

(defpackage #:server-app
  (:use #:cl
        #:utopian
        #:wiringpi-wrapper))
(in-package #:server-app)

;;; Controller
(defun aget (item alist)
  (cdr (assoc item alist :test #'string=)))

(defun index (params)
  (declare (ignore params)))

(defconstant +output+ 1)
(defconstant +high+   1)
(defconstant +low+    0)

(wiringpi-setup-gpio)

(defun d-write (params)
  (let ((pin    (parse-integer (aget "pin" params)))
        (status (aget "status" params)))
    (pin-mode pin +output+)
    (cond ((string= status "high")
           (digital-write pin +high+))
          ((string= status "low")
           (digital-write pin +low+))
          (t nil))))

;;; Routes
(defroutes *routes* ((:GET "/" #'index)))
(route :GET "/d-write" #'d-write)

;;; Run
(defapp minimal-app () ())
(make-instance 'minimal-app
               :routes *routes*)
