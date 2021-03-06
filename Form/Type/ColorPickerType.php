<?php

namespace Ekyna\Bundle\CoreBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\Form\FormView;
use Symfony\Component\OptionsResolver\OptionsResolver;

/**
 * Class ColorPickerType
 * @package Ekyna\Bundle\CoreBundle\Form\Type
 * @author Étienne Dauvergne <contact@ekyna.com>
 * @see http://www.jqueryrain.com/?obvgj1Bz
 */
class ColorPickerType extends AbstractType
{
    /**
     * {@inheritdoc}
     */
    public function buildView(FormView $view, FormInterface $form, array $options)
    {
        $pickerOptions = $options['pickerOptions'];

        $view->vars = array_replace($view->vars, [
            'pickerOptions' => $pickerOptions,
        ]);
    }

    /**
     * {@inheritdoc}
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'pickerOptions' => [
                'color' => '#ffffff',
                'previewformat' => 'hex',
                'size' => 'default',
                'placement' => 'bottom',
                'flat' => false,
                'hsvpanel' => true,
                'sliders' => false,
                'swatches' => false,
            ],
        ]);
    }

    /**
     * {@inheritdoc}
     */
    public function getParent()
    {
        return 'text';
    }

    /**
     * {@inheritdoc}
     */
    public function getName()
    {
        return 'ekyna_color_picker';
    }
}
